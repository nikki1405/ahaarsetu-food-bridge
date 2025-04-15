
export type Campaign = {
  id: string;
  title: string;
  organizerName: string;
  dateTime: string;
  location: string;
  description: string;
  status: "upcoming" | "ongoing" | "completed";
  isJoined?: boolean;
};
