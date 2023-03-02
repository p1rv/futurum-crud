import { useEffect, useRef } from "react";
import { useDeleteCampaignMutation, useUpdateCampaignMutation } from "../store";
import { ICampaignEntry } from "../types";
import { CampaignForm } from "./CampaignForm";
import { ICampaignDetailsProps } from "./CampaignItem";

export const CampaignEdit: React.FC<ICampaignDetailsProps> = ({ campaign, toggleEditMode }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [updateCampaign] = useUpdateCampaignMutation();
  const [deleteCampaign] = useDeleteCampaignMutation();

  const onSubmit = (updatedCampaign: Omit<ICampaignEntry, "id">) => {
    updateCampaign({ ...campaign, ...updatedCampaign });
    toggleEditMode();
  };

  const onDelete = () => {
    deleteCampaign(campaign.id);
    toggleEditMode();
  };

  const onWindowClick = (e: MouseEvent) => {
    !wrapperRef.current?.contains(e.target as HTMLElement) && toggleEditMode();
  };

  useEffect(() => {
    window.addEventListener("click", onWindowClick, { capture: true });
    return () => {
      window.removeEventListener("click", onWindowClick, { capture: true });
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      <CampaignForm
        campaign={campaign}
        onSubmit={onSubmit}
        onSubmitText="Apply Changes"
        onDiscard={onDelete}
        onDiscardText="Delete Campaign"
      />
    </div>
  );
};
