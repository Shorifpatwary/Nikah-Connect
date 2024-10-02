import {
  LocationType,
  LocationTypeWithoutChildren,
} from "@/assets/data/response-types/locations";
import { BioSearchData } from "@/components/blocks/bioSearchBox/data";
import { Badge } from "@/components/ui/badge";
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
import { MoveLeft, MoveRight, X } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  className?: string;
  label: string;
  values: LocationTypeWithoutChildren[];
  setValues: Dispatch<SetStateAction<LocationTypeWithoutChildren[]>>;
  isOnlyChildren?: boolean;
};

const SelectLocations = ({
  className,
  values,
  setValues,
  label,
  isOnlyChildren = false,
}: Props) => {
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [currentLocation, setCurrentLocation] = useState<LocationType>();
  const [selectedLocations, setSelectedLocations] = useState<LocationType[]>(
    []
  );
  const handleLocations = (locationString: string) => {
    const locationObject: LocationType = JSON.parse(locationString);
    const locationIsInValues = values.some(
      location => location.id === locationObject.id
    );
    // avoid when value are present to the values array.
    if (!locationIsInValues) {
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
    if (location && !values.some(value => value.id === location.id)) {
      const { children, ...rest } = location;
      setValues([...values, { ...rest }]);
    } else {
      resetState();
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
      location =>
        !values.some(selectedLocation => selectedLocation.id === location.id)
    );

    return displayLocations;
  };

  const resetState = () => {
    setCurrentLocation(undefined);
    setSelectedLocations([]);
  };

  const handleUnselect = (id: number) => {
    // Filter out the item with the given id
    const updatedValues = values.filter(location => location.id !== id);
    setValues(updatedValues);
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
    if (
      isOnlyChildren &&
      Boolean(!selectedLocations[selectedLocations.length - 1]?.children.length)
    ) {
    } else {
      resetState();
    }
  }, [values]);

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
    // setTimeout(() => fetchLocations(), 3000);
  }, []);
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* show dynamic select box */}
      <Label htmlFor="name" className="text-lg capitalize max-md:text-xl">
        {label}
      </Label>
      <Select onValueChange={value => handleLocations(value)} open={selectOpen}>
        <SelectTrigger onClick={() => setSelectOpen(true)}>
          <SelectValue
            placeholder={BioSearchData.bioTypes.hintText}
            aria-label={BioSearchData.bioTypes.hintText}
          >
            {currentLocation
              ? currentLocation.name + " " + currentLocation.type
              : BioSearchData.bioTypes.hintText}
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

      {/* show selected values */}
      <div className="my-4 flex flex-wrap gap-2">
        {values.map(location => (
          <Badge
            variant="outline"
            key={location.id}
            className=" border-y-2 border-primary px-3 py-1 text-base font-thin"
          >
            {`${location.name} ${location.type}`}
            <button
              type="button"
              className={
                "ml-2 rounded-full  text-primary outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              }
              onClick={() => handleUnselect(location.id)}
            >
              <X className="text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default React.memo(SelectLocations);
