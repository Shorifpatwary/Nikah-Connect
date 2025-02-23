import {
  allBio,
  backendUrl,
  bioMinFilledMarks,
  shortBios,
} from "@/assets/data/config/app.config";
import { BioWithFilledMarks } from "@/assets/data/response-types/bio";
import { Data } from "@/components/dashboard/bio/bio-header-action/data";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import getAuthUserIdFromClientCookies from "@/lib/request/header/getAuthUserIdFromClientCookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  className?: string;
  bioWithFilledMarks: BioWithFilledMarks;
  toast: (props: Toast) => void;
};

const BioHeaderActionButton = ({ bioWithFilledMarks, toast }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  // handle approve request
  const handleApproveRequest = async () => {
    try {
      setIsLoading(true);
      const url = `${backendUrl}/api/bio/approve-bio-request`;
      const userId = getAuthUserIdFromClientCookies();

      const response = await fetchRequest<ResponseType>({
        url,
        options: {
          method: "POST", // Use POST method for approval request
        },
        tagRevalidate: [`${allBio}_${userId}`, `${shortBios}_${userId}`],
      });

      if (response.status === 200 || response.status === 201) {
        toast({
          title: Data.bio.approveRequest.success.title,
          variant: "primary",
          description: Data.bio.approveRequest.success.description,
        });
        router.push(Data.bio.approveRequest.success.redirectUrl);
      } else {
        toast({
          title: Data.bio.approveRequest.unKnownError.title,
          variant: "destructive",
          description: Data.bio.approveRequest.unKnownError.description,
        });
      }
    } catch (error) {
      toast({
        title: Data.bio.approveRequest.unKnownError.title,
        variant: "destructive",
        description: Data.bio.approveRequest.unKnownError.description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (
    bioWithFilledMarks.type == "SHORT" ||
    bioWithFilledMarks.type == "SHORT_TO_LONG_APPROVED_REQUEST"
  ) {
    return (
      <Link href={Data.editShortBio.url} prefetch={false}>
        <Button className="text-xl" variant="secondary">
          {Data.editShortBio.label}
        </Button>
      </Link>
    );
  } else if (
    bioWithFilledMarks.type == "SHORT_TO_LONG_DRAFT" ||
    bioWithFilledMarks.status !== "approved"
  ) {
    const marks = bioWithFilledMarks.filled_marks;
    if (
      (marks?.general_filled_marks ?? 0) >= bioMinFilledMarks.general &&
      (marks?.location_filled_marks ?? 0) >= bioMinFilledMarks.location &&
      (marks?.education_filled_marks ?? 0) >= bioMinFilledMarks.education &&
      (marks?.personal_info_filled_marks ?? 0) >=
        bioMinFilledMarks.personal_info &&
      (marks?.family_filled_marks ?? 0) >= bioMinFilledMarks.family &&
      (marks?.profession_filled_marks ?? 0) >= bioMinFilledMarks.profession &&
      (marks?.religious_activity_filled_marks ?? 0) >=
        bioMinFilledMarks.religious &&
      (marks?.marital_info_filled_marks ?? 0) >= bioMinFilledMarks.marital &&
      (marks?.expected_partner_filled_marks ?? 0) >=
        bioMinFilledMarks.expected_partner &&
      (marks?.hidden_info_filled_marks ?? 0) >= bioMinFilledMarks.hidden
    ) {
      <Button
        className="text-xl"
        onClick={handleApproveRequest}
        disabled={isLoading}
      >
        {Data.approveRequestShortBio.label}
      </Button>;
    } else {
      return null;
    }
  }
};

export default BioHeaderActionButton;
