import Routes, { BioSection } from "@/assets/data/routes";
import { fetchRequest } from "@/lib/request/fetchRequest";
const fetchBioSection = async <T>(
  bioSection: BioSection,
  setValue: React.Dispatch<React.SetStateAction<T | null>>
) => {
  try {
    const url = Routes.api.bio.user_record(bioSection);
    const response = await fetchRequest<T>({
      url,
      options: {
        method: "GET",
      },
    });
    setValue(response.data.data);
  } catch (error) {
    console.error(`Error fetching ${bioSection}:`, error);
  }
};

export default fetchBioSection;
