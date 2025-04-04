import React, { useState } from 'react';
import { ClubMembershipSubscription } from '../types/ClubMembership';
import ClubMembershipSubscriptionCard from './ClubMembershipSubscriptionCard';


const ClubMembershipSubscriptionList: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<ClubMembershipSubscription[]>([
    // Add more subscriptions as necessary
  ]);

  const handleEditSave = (updated: ClubMembershipSubscription) => {
    setSubscriptions((prev) =>
      prev.map((subscription) => (subscription.id === updated.id ? updated : subscription))
    );
  };

  const handleDelete = (id: number) => {
    setSubscriptions((prev) => prev.filter((subscription) => subscription.id !== id));
  };

  return (
    <div>
      {subscriptions.map((subscription) => (
        <ClubMembershipSubscriptionCard
          key={subscription.id}
          subscription={subscription}
          onEditSave={handleEditSave}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ClubMembershipSubscriptionList;
