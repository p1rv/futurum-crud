import { useAddCampaignMutation } from "../store";
import { ICampaignEntry } from "../types";
import { CampaignForm } from "./CampaignForm";

interface ICampaignAddProps {
  closeForm: () => void;
}

const CampaignAdd: React.FC<ICampaignAddProps> = ({ closeForm }) => {
  const [addCampaign] = useAddCampaignMutation();

  const onSubmit = (newCampaign: Omit<ICampaignEntry, "id">) => {
    addCampaign(newCampaign);
    closeForm();
  };

  const onDiscard = () => {
    closeForm();
  };

  return (
    <div>
      <CampaignForm
        onSubmit={onSubmit}
        onSubmitText="Add Campaign"
        onDiscard={onDiscard}
        onDiscardText="Discard Changes"
      />
    </div>
  );
};

export default CampaignAdd;
