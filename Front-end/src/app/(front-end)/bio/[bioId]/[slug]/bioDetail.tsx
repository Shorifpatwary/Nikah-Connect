import BioExpectedProfile from "@/app/(front-end)/bio/(component)/bio-card/bio-expected-profile";
import BioQuestionsSection from "@/app/(front-end)/bio/(component)/bio-question-section";
import BioItemQuestion from "@/app/(front-end)/bio/(component)/bio-question-section/bio-question";
import BioTextItemQuestion from "@/app/(front-end)/bio/(component)/bio-question-section/bio-question/bio-text-item-question";
import { BioItemData } from "@/app/(front-end)/bio/[bioId]/[slug]/data";
import BioProfileBlock from "@/app/(front-end)/bio/[bioId]/[slug]/profile-block";
import { heights, weights } from "@/assets/data/config/app.config";
import { BioInterface } from "@/assets/data/response-types/bio";
import Section from "@/components/blocks/section";
import { convertStringToArray, formatMonthYearInBangla } from "@/lib/utils";
import { notFound } from "next/navigation";

// Helper function to fetch bio data
async function fetchBioData(bioId: string): Promise<BioInterface | null> {
  const apiBaseUrl = process.env.APP_URL || "http://localhost:3000";
  const response = await fetch(`${apiBaseUrl}/api/bio/public/${bioId}`);

  if (response.ok) {
    const bioData = await response.json();
    return bioData.data as BioInterface;
  }

  if (response.status === 404) {
    return null; // Graceful handling for not found
  }
  throw new Error(`Failed to fetch bio. Status: ${response.status}`);
}

interface BioDetailProps {
  bioId: string;
}

const BioDetail = async ({ bioId }: BioDetailProps) => {
  const bioData = await fetchBioData(bioId);

  if (!bioData) {
    notFound(); // Display the 404 page
  }

  const {
    general_section,
    location_section,
    education_section,
    profession_section,
    personal_details,
    family_info_sections,
    religious_activity,
    marriage_info,
    expected_partner,
  } = bioData;

  if (bioData.type !== "LONG") {
    return (
      <Section rowClassName="flex-col justify-center item-center center-center gap-8">
        {bioData && (
          <>
            <BioProfileBlock
              bio_profile={bioData.bio_profile}
              id={bioData.id}
            />
            <BioQuestionsSection title={BioItemData.general.label}>
              {general_section && (
                <>
                  <BioItemQuestion
                    className="w-full md:w-[49%]"
                    question={BioItemData.general.questions.gender}
                    answer={general_section?.gender}
                  />
                  <BioItemQuestion
                    className="w-full md:w-[49%]"
                    question={BioItemData.general.questions.marital_status}
                    answer={general_section?.marital_status}
                  />
                  <BioItemQuestion
                    className="w-full md:w-[49%]"
                    question={BioItemData.general.questions.birth_date}
                    answer={formatMonthYearInBangla(
                      general_section?.birth_date || ""
                    )}
                  />
                  <BioItemQuestion
                    className="w-full md:w-[49%]"
                    question={BioItemData.general.questions.complexion}
                    answer={general_section?.complexion}
                  />
                  <BioItemQuestion
                    className="w-full md:w-[49%]"
                    question={BioItemData.general.questions.height}
                    answer={`${
                      heights.filter(
                        item =>
                          Number(item.value) == Number(general_section?.height)
                      )[0]?.label || ""
                    }`}
                  />
                  <BioItemQuestion
                    className="w-full md:w-[49%]"
                    question={BioItemData.general.questions.weight}
                    answer={`${
                      weights.filter(
                        item =>
                          Number(item.value) == Number(general_section?.weight)
                      )[0]?.label || ""
                    }`}
                  />
                  <BioItemQuestion
                    className="w-full md:w-[49%]"
                    question={BioItemData.general.questions.blood_group}
                    answer={general_section?.blood_group}
                  />
                  <BioItemQuestion
                    className={`w-full md:w-[49%] ${
                      general_section.language_skills ? "" : "md:hidden"
                    }`}
                    question={
                      general_section.language_skills
                        ? BioItemData.general.questions.language_skills
                        : "-"
                    }
                    answer={general_section?.language_skills || "-"}
                  />
                  <BioItemQuestion
                    className="w-full md:w-[49%]"
                    question={BioItemData.questions.createdAt}
                    answer={formatMonthYearInBangla(bioData.created_at || "")}
                  />
                  <BioItemQuestion
                    className="w-full md:w-[49%]"
                    question={BioItemData.questions.updatedAt}
                    answer={formatMonthYearInBangla(bioData.updated_at || "")}
                  />
                </>
              )}
            </BioQuestionsSection>
            <BioQuestionsSection title={BioItemData.short.othersLabel}>
              {location_section && (
                <>
                  <BioTextItemQuestion
                    className="w-full"
                    question={BioItemData.location.questions.permanent_address}
                    answer={location_section?.permanent_address}
                  />
                </>
              )}
              {education_section && (
                <>
                  <BioTextItemQuestion
                    className="w-full"
                    question={BioItemData.education.questions.education_medium}
                    answer={education_section?.education_medium}
                  />
                  <BioTextItemQuestion
                    className="w-full"
                    question={BioItemData.education.questions.previous_exams}
                    answer={education_section?.previous_exams}
                  />
                </>
              )}
              {/* personal info section */}
              {personal_details && (
                <>
                  <BioTextItemQuestion
                    className="w-full"
                    question={
                      BioItemData.personal_info.questions.about_yourself
                    }
                    answer={personal_details?.about_yourself}
                  />
                </>
              )}
              {family_info_sections && (
                <>
                  <BioTextItemQuestion
                    className="w-full"
                    question={BioItemData.family.questions.family_members_info}
                    answer={family_info_sections?.family_members_info}
                  />
                  <BioTextItemQuestion
                    className="w-full"
                    question={BioItemData.family.questions.economic_status}
                    answer={family_info_sections?.economic_status}
                  />
                </>
              )}
              {/* profession section */}
              {profession_section && (
                <>
                  <BioTextItemQuestion
                    className="w-full"
                    question={BioItemData.profession.questions.profession}
                    answer={profession_section?.profession}
                  />

                  <BioTextItemQuestion
                    className="w-full"
                    question={
                      BioItemData.profession.questions.profession_description
                    }
                    answer={profession_section?.profession_description}
                  />
                </>
              )}
              {/* religious section */}
              {religious_activity && (
                <>
                  <BioTextItemQuestion
                    className="w-full"
                    question={BioItemData.religious.questions.mazhab}
                    answer={religious_activity?.mazhab}
                  />
                </>
              )}
              {/* marriage info section */}
              {marriage_info && (
                <>
                  <BioTextItemQuestion
                    className="w-full"
                    question={BioItemData.marriage_info.questions.prev_marriage}
                    answer={marriage_info?.prev_marriage}
                  />
                </>
              )}
            </BioQuestionsSection>
          </>
        )}
      </Section>
    );
  }

  return (
    <Section rowClassName="flex-col justify-center item-center center-center gap-8">
      {/* general section */}
      {general_section && (
        <BioQuestionsSection title={BioItemData.general.label}>
          <BioItemQuestion
            className="w-full md:w-[49%]"
            question={BioItemData.general.questions.gender}
            answer={general_section?.gender}
          />
          <BioItemQuestion
            className="w-full md:w-[49%]"
            question={BioItemData.general.questions.marital_status}
            answer={general_section?.marital_status}
          />
          <BioItemQuestion
            className="w-full md:w-[49%]"
            question={BioItemData.general.questions.birth_date}
            answer={formatMonthYearInBangla(general_section?.birth_date || "")}
          />
          <BioItemQuestion
            className="w-full md:w-[49%]"
            question={BioItemData.general.questions.complexion}
            answer={general_section?.complexion}
          />
          <BioItemQuestion
            className="w-full md:w-[49%]"
            question={BioItemData.general.questions.height}
            answer={`${
              heights.filter(
                item => Number(item.value) == Number(general_section?.height)
              )[0]?.label || ""
            }`}
          />
          <BioItemQuestion
            className="w-full md:w-[49%]"
            question={BioItemData.general.questions.weight}
            answer={`${
              weights.filter(
                item => Number(item.value) == Number(general_section?.weight)
              )[0]?.label || ""
            }`}
          />
          <BioItemQuestion
            className="w-full md:w-[49%]"
            question={BioItemData.general.questions.blood_group}
            answer={general_section?.blood_group}
          />
          <BioItemQuestion
            className="w-full md:w-[49%]"
            question={BioItemData.general.questions.language_skills}
            answer={general_section?.language_skills}
          />
          <BioItemQuestion
            className="w-full md:w-[49%]"
            question={BioItemData.questions.createdAt}
            answer={formatMonthYearInBangla(bioData.created_at || "")}
          />
          <BioItemQuestion
            className="w-full md:w-[49%]"
            question={BioItemData.questions.updatedAt}
            answer={formatMonthYearInBangla(bioData.updated_at || "")}
          />
        </BioQuestionsSection>
      )}

      {/* location section */}
      {location_section && (
        <BioQuestionsSection title={BioItemData.location.label}>
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.location.questions.permanent_address}
            answer={location_section?.permanent_address}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.location.questions.present_address}
            answer={location_section?.present_address}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.location.questions.relocate_plan}
            answer={location_section?.relocate_plan}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.location.questions.childhood_address}
            answer={location_section?.childhood_address}
          />
        </BioQuestionsSection>
      )}

      {/* education section */}
      {education_section && (
        <BioQuestionsSection title={BioItemData.education.label}>
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.education.questions.education_medium}
            answer={education_section?.education_medium}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.education.questions.current_study}
            answer={education_section?.current_study}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.education.questions.highest_qualification}
            answer={education_section?.highest_qualification}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.education.questions.previous_exams}
            answer={education_section?.previous_exams}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.education.questions.other_qualifications}
            answer={education_section?.other_qualifications}
          />
        </BioQuestionsSection>
      )}

      {/* personal info section */}
      {personal_details && (
        <BioQuestionsSection title={BioItemData.personal_info.label}>
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.personal_info.questions.about_yourself}
            answer={personal_details?.about_yourself}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.personal_info.questions.outdoor_clothing}
            answer={personal_details?.outdoor_clothing}
          />

          <BioTextItemQuestion
            className="w-full"
            question={
              BioItemData.personal_info.questions.physical_mental_illness
            }
            answer={personal_details?.physical_mental_illness}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.personal_info.questions.favorite_books}
            answer={personal_details?.favorite_books}
          />

          <BioTextItemQuestion
            className="w-full"
            question={
              BioItemData.personal_info.questions.favorite_online_personalities
            }
            answer={personal_details?.favorite_online_personalities}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.personal_info.questions.device_usage_time}
            answer={personal_details?.device_usage_time}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.personal_info.questions.affiliations}
            answer={personal_details?.affiliations}
          />
        </BioQuestionsSection>
      )}

      {/* family info section */}
      {family_info_sections && (
        <BioQuestionsSection title={BioItemData.family.label}>
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.family.questions.family_members_info}
            answer={family_info_sections?.family_members_info}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.family.questions.uncles_info}
            answer={family_info_sections?.uncles_info}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.family.questions.descent}
            answer={family_info_sections?.descent}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.family.questions.economic_status}
            answer={family_info_sections?.economic_status}
          />
        </BioQuestionsSection>
      )}

      {/* profession section */}
      {profession_section && (
        <BioQuestionsSection title={BioItemData.profession.label}>
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.profession.questions.profession}
            answer={profession_section?.profession}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.profession.questions.profession_description}
            answer={profession_section?.profession_description}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.profession.questions.monthly_income}
            answer={profession_section?.monthly_income}
          />
        </BioQuestionsSection>
      )}
      {/* profession section */}
      {religious_activity && (
        <BioQuestionsSection title={BioItemData.religious.label}>
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.religious.questions.prayer_habits}
            answer={religious_activity?.prayer_habits}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.religious.questions.haram_relationships}
            answer={religious_activity?.haram_relationships}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.religious.questions.quran_recitation}
            answer={religious_activity?.quran_recitation}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.religious.questions.mahram_adherence}
            answer={religious_activity?.mahram_adherence}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.religious.questions.has_beard}
            answer={religious_activity?.has_beard}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.religious.questions.entertainment_habits}
            answer={religious_activity?.entertainment_habits}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.religious.questions.mazhab}
            answer={religious_activity?.mazhab}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.religious.questions.religious_beliefs}
            answer={religious_activity?.religious_beliefs}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.religious.questions.religious_knowledge}
            answer={religious_activity?.religious_knowledge}
          />
          <BioTextItemQuestion
            className="w-full"
            question={
              BioItemData.religious.questions.family_religious_environment
            }
            answer={religious_activity?.family_religious_environment}
          />
        </BioQuestionsSection>
      )}
      {/* marriage info section */}
      {marriage_info && (
        <BioQuestionsSection title={BioItemData.marriage_info.label}>
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.marriage_info.questions.prev_marriage}
            answer={marriage_info?.prev_marriage}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.marriage_info.questions.work_after}
            answer={marriage_info?.work_after}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.marriage_info.questions.study_after}
            answer={marriage_info?.study_after}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.marriage_info.questions.ceremony_plans}
            answer={marriage_info?.ceremony_plans}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.marriage_info.questions.partner_view_rules}
            answer={marriage_info?.partner_view_rules}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.marriage_info.questions.marriage_weakness}
            answer={marriage_info?.marriage_weakness}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.marriage_info.questions.family_pref}
            answer={marriage_info?.family_pref}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.marriage_info.questions.compromise_factors}
            answer={marriage_info?.compromise_factors}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.marriage_info.questions.dowry_amount}
            answer={marriage_info?.dowry_amount}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.marriage_info.questions.dowry_opinion}
            answer={marriage_info?.dowry_opinion}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.marriage_info.questions.cash_gift_opinion}
            answer={marriage_info?.cash_gift_opinion}
          />
        </BioQuestionsSection>
      )}

      {/* expected partner section */}
      {expected_partner && (
        <BioQuestionsSection title={BioItemData.expected_partner.label}>
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.expected_partner.questions.age}
            answer={expected_partner?.age}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.expected_partner.questions.height}
            answer={expected_partner?.height}
          />

          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.expected_partner.questions.complexion}
            answer={expected_partner?.complexion}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.expected_partner.questions.marital_status}
            answer={expected_partner?.marital_status}
          />
          <BioTextItemQuestion
            className="w-full"
            question={
              BioItemData.expected_partner.questions.educational_qualification
            }
            answer={expected_partner?.educational_qualification}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.expected_partner.questions.profession}
            answer={expected_partner?.profession}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.expected_partner.questions.economic_status}
            answer={expected_partner?.economic_status}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.expected_partner.questions.bio_profile_types}
            answer={
              <BioExpectedProfile
                className="max-w-56 justify-start"
                bio_profile_types={convertStringToArray(
                  expected_partner?.bio_profile_types
                )}
              />
            }
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.expected_partner.questions.family}
            answer={expected_partner?.family}
          />
          <BioTextItemQuestion
            className="w-full"
            question={BioItemData.expected_partner.questions.about_partner}
            answer={expected_partner?.about_partner}
          />
        </BioQuestionsSection>
      )}
    </Section>
  );
};

export default BioDetail;
