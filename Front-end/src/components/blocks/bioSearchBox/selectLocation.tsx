import {
  LocationType,
  LocationTypeWithoutChildren,
} from "@/assets/data/response-types/locations";
import { BioSearchData } from "@/components/blocks/bioSearchBox/data";
import ErrorMessage from "@/components/blocks/form-helper/error";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { MoveLeft, MoveRight } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  className?: string;
  label: string;
  labelRequired?: boolean;
  value: LocationTypeWithoutChildren | null;
  setValue: Dispatch<SetStateAction<LocationTypeWithoutChildren | null>>;
  isOnlyChildren?: boolean;
  triggerText: string;
  errorMessage?: string | undefined;
  defaultValue?: LocationType;
};

const SelectLocation = ({
  className,
  value,
  setValue,
  label,
  labelRequired = false,
  triggerText,
  isOnlyChildren = false,
  errorMessage,
  defaultValue,
}: Props) => {
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [currentLocation, setCurrentLocation] = useState<LocationType>();
  const [selectedLocations, setSelectedLocations] = useState<LocationType[]>(
    []
  );

  const handleLocations = (locationString: string) => {
    const locationObject: LocationType = JSON.parse(locationString);
    const locationIsInValue = value?.id === locationObject.id;
    // avoid when value are present to the values array.
    if (!locationIsInValue) {
      const updateSelectedLocations = (
        locations: LocationType[],
        locationObj: LocationType
      ) => {
        const newItemIndex = selectedLocations.findIndex(
          location => location.id === locationObj?.id
        );
        // when condition false
        const sameTypeLocationIndex = selectedLocations.findIndex(
          location => location.type === locationObj?.type
        );
        // remove previous one along with her children.
        if (sameTypeLocationIndex !== -1) {
          const newLocations = locations.slice(0, sameTypeLocationIndex);
          return [...newLocations, locationObj];
        } else if (newItemIndex !== -1) {
          return locations;
        }
        return [...locations, locationObj];
      };

      if (Boolean(locationObject.children.length)) {
        setSelectedLocations(prevSelectedLocations => {
          // Insert new element and remove siblings and next elements
          return updateSelectedLocations(prevSelectedLocations, locationObject);
        });
        setCurrentLocation(locationObject);
      } else {
        setSelectedLocations(prevSelectedLocations => {
          // Insert new element and remove siblings and next elements
          return updateSelectedLocations(prevSelectedLocations, locationObject);
        });
        //  don't set selectedLocations when, this is the last child
        handleSetValues(locationObject);
      }
    }
  };

  const getCurrentIndex = () => {
    const currentIndex = selectedLocations.findIndex(
      location => location.id === currentLocation?.id
    );
    return currentIndex;
  };
  const selectBackHandler = () => {
    if (currentLocation) {
      const currentIndex = getCurrentIndex();
      // Move one step back
      if (
        currentIndex >= 0 &&
        currentIndex !== -1 &&
        Boolean(selectedLocations.length)
      ) {
        const newCurrentLocation = selectedLocations[currentIndex - 1];
        setCurrentLocation(newCurrentLocation);
      } else {
        setCurrentLocation(undefined);
      }
    }
  };

  const selectNextHandler = () => {
    if (Boolean(selectedLocations.length)) {
      const currentIndex = getCurrentIndex();
      // Move one step back
      if (currentIndex !== -1) {
        if (
          !(currentIndex >= selectedLocations.length - 1) &&
          Boolean(selectedLocations[currentIndex + 1]?.children.length)
        ) {
          const newCurrentLocation = selectedLocations[currentIndex + 1];
          setCurrentLocation(newCurrentLocation);
        }
      } else {
        setCurrentLocation(selectedLocations[0]);
      }
    }
  };

  const handleSetValues = (
    location: LocationType = currentLocation as LocationType
  ) => {
    if (location && !(value?.id === location.id)) {
      const { children, ...rest } = location;
      setValue({ ...rest });
    }
  };

  const handleFocusOut = () => {
    setSelectOpen(false);
    // set current value when isOnlyChildren are false.
    if (!isOnlyChildren) {
      handleSetValues();
    }
  };

  const getDisplayLocations = () => {
    let displayLocations = [];
    if (!currentLocation) {
      displayLocations = locations.filter(
        location => location.parent_id === null
      );
    } else {
      displayLocations = currentLocation.children;
    }

    displayLocations = displayLocations.filter(
      location => !(value?.id === location.id)
    );

    return displayLocations;
  };

  const resetState = () => {
    setCurrentLocation(undefined);
    setSelectedLocations([]);
  };
  const handleUnselect = () => {
    setValue(null);
    resetState();
  };
  const isPrevDisabled = () => {
    const currentIndex = getCurrentIndex();
    if (Boolean(selectedLocations.length)) {
      if (currentIndex >= 0 || currentIndex !== -1) {
        return false;
      }
    }
    return true;
  };

  const isNextDisabled = () => {
    const currentIndex = getCurrentIndex();
    if (Boolean(selectedLocations.length)) {
      if (
        !(currentIndex >= selectedLocations.length - 1) &&
        Boolean(selectedLocations[currentIndex + 1]?.children.length)
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  // auto remove after change the value state
  useEffect(() => {
    setSelectOpen(false);
  }, [value]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/locations");
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* show dynamic select box */}
      <Label htmlFor="name" className="text-lg capitalize max-md:text-xl">
        {label}{" "}
        {labelRequired && <span className="ml-1 text-red-600">(*)</span>}
      </Label>
      <Select onValueChange={value => handleLocations(value)} open={selectOpen}>
        <SelectTrigger onClick={() => setSelectOpen(true)}>
          <SelectValue
            placeholder={
              defaultValue
                ? `${defaultValue.name} ${defaultValue.type}`
                : triggerText
            }
            aria-label={
              defaultValue
                ? `${defaultValue.name} ${defaultValue.type}`
                : triggerText
            }
          >
            {value
              ? `${value.name} ${value.type}`
              : currentLocation
                ? `${currentLocation.name} ${currentLocation.type}`
                : triggerText}
          </SelectValue>
        </SelectTrigger>

        {locations.length > 0 && (
          <SelectContent onPointerDownOutside={handleFocusOut}>
            <SelectGroup>
              <SelectLabel className="flex items-center justify-between gap-4 font-thin">
                <Button
                  size="icon"
                  onClick={selectBackHandler}
                  disabled={isPrevDisabled()}
                >
                  <MoveLeft />
                </Button>
                <span aria-label="select label">
                  {currentLocation
                    ? currentLocation?.name + " " + currentLocation?.type
                    : BioSearchData.locations.hintText}
                </span>
                <Button
                  size="icon"
                  onClick={selectNextHandler}
                  disabled={isNextDisabled()}
                >
                  <MoveRight />
                </Button>
              </SelectLabel>
              {getDisplayLocations().map(location => {
                return (
                  <SelectItem
                    key={location.id}
                    className="capitalize"
                    value={JSON.stringify(location)}
                  >
                    {`${location.name} ${location.type}`}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        )}
      </Select>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {/* show selected values */}
      {/* <div className="my-4 flex flex-wrap gap-2">
        {value && (
          <Badge
            variant="outline"
            className=" border-y-2 border-primary px-3 py-1 text-base font-thin"
          >
            {`${value.name} ${value.type}`}
            <button
              type="button"
              className={
                "ml-2 rounded-full  text-primary outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              }
              onClick={() => handleUnselect()}
            >
              <X className="text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        )}
      </div> */}
    </div>
  );
};

export default React.memo(SelectLocation);
