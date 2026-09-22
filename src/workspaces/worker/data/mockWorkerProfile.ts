export interface WorkerProfileData {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profession: string;
  professionsList: string[];
  workExperience: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  bio: string;
  emergencyContact: {
    person: string;
    phoneNumber: string;
    relation: string;
  };
  avatarUrl: string;
}

export const INITIAL_WORKER_PROFILE: WorkerProfileData = {
  id: "w-101",
  firstName: "Alex",
  lastName: "Morgan",
  fullName: "Alex Morgan",
  profession: "#Plumber, #Electrician",
  professionsList: ["#Plumber", "#Electrician"],
  workExperience: "4 Years",
  dateOfBirth: "05/07/1989",
  phoneNumber: "+1 012 345 6789",
  address: "Boylston St, Building 45, Apartment 3A",
  bio: "Skilled Plumber & Electrician with hands-on experience in plumbing repairs, electrical installations, maintenance, and troubleshooting. Committed to delivering reliable, safe, and high-quality workmanship on every job.",
  emergencyContact: {
    person: "David Edison",
    phoneNumber: "+1 012 345 6789",
    relation: "Spouse",
  },
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
};
