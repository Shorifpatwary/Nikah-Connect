export interface LocationType {
  id: number;
  name: string;
  type: string;
  parent_id: number;
  children: LocationType[];
}
// Dynamically create a type without the children property
export type LocationTypeWithoutChildren = Omit<LocationType, "children">;
