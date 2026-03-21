export const referralMockData = {
  referralCode: "CREATOR-HUB-REF-2024",
  shareUrl: "https://app.creatorhub.com/signup?ref=CREATOR-HUB-REF-2024",
  metrics: {
    totalEarned: 1250.0,
    successfulReferrals: 25,
  },
  recentReferrals: [
    {
      id: "ref_123",
      name: "Sarah Jenkins",
      avatarUrl: "/DefaultProfilePhoto.png",
      joinedAt: "2024-03-04T10:30:00Z",
      earnedAmount: "$50.00",
    },
    {
      id: "ref_123",
      name: "Sarah Jenkins",
      avatarUrl: "/DefaultProfilePhoto.png",
      joinedAt: "2024-03-04T10:30:00Z",
      earnedAmount: "$50.00",
    },
    {
      id: "ref_123",
      name: "Sarah Jenkins",
      avatarUrl: "/DefaultProfilePhoto.png",
      joinedAt: "2024-03-04T10:30:00Z",
      earnedAmount: "$50.00",
    },
  ],
};

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Invite Friends",
    desc: "Share your referral link via social media or email.",
  },
  {
    step: 2,
    title: "They Sign Up",
    desc: (
      <>
        Your friend joins, and gets a{" "}
        <span className="typo-body-two-m text-center text-[#4F49D8] dark:text-white">
          10% earnings boost
        </span>{" "}
        for their first 10 days.
      </>
    ),
  },
  {
    step: 3,
    title: "You Get Paid",
    desc: "Receive your referral bonus instantly in your wallet.",
  },
];
