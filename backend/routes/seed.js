import express from "express";
import Provider from "../models/provider.js";

const seedRouter = express.Router();

// Dummy data for seeding
const providers = [
  {
    first_name: "Alexander",
    last_name: "Nguyen",
    specality: ["Cardiology", "Preventive Cardiology"],
    languages: ["English", "Vietnamese"],
    insurance: [
      { provider: "Blue Cross Blue Shield", plan: "Platinum Plan" },
      { provider: "Aetna", plan: "PPO" }
    ],
    contact: {
      phone: "67890123411",
      email: "alexander.nguyen@example.com"
    }
  },
  {
    first_name: "Hannah",
    last_name: "Patel",
    specality: ["Endocrinology", "Diabetes Management"],
    languages: ["English", "Hindi"],
    insurance: [
      { provider: "Cigna", plan: "Silver Plan" },
      { provider: "UnitedHealthcare", plan: "Gold Plan" }
    ],
    contact: {
      phone: "78901234512",
      email: "hannah.patel@example.com"
    }
  },
  {
    first_name: "Ethan",
    last_name: "Rodriguez",
    specality: ["Neurology", "Epilepsy Treatment"],
    languages: ["English", "Spanish"],
    insurance: [
      { provider: "Humana", plan: "Comprehensive Plan" },
      { provider: "Kaiser Permanente", plan: "HMO" }
    ],
    contact: {
      phone: "89012345613",
      email: "ethan.rodriguez@example.com"
    }
  },
  {
    first_name: "Sophia",
    last_name: "Kim",
    specality: ["Dermatology", "Cosmetic Dermatology"],
    languages: ["English", "Korean"],
    insurance: [
      { provider: "Blue Cross Blue Shield", plan: "Gold Plan" },
      { provider: "Aetna", plan: "HMO" }
    ],
    contact: {
      phone: "90123456714",
      email: "sophia.kim@example.com"
    }
  },
  {
    first_name: "David",
    last_name: "Carter",
    specality: ["Orthopedic Surgery", "Sports Medicine"],
    languages: ["English"],
    insurance: [
      { provider: "Medicare", plan: "Part B" },
      { provider: "UnitedHealthcare", plan: "PPO" }
    ],
    contact: {
      phone: "01234567815",
      email: "david.carter@example.com"
    }
  },
  {
    first_name: "Emily",
    last_name: "Johnson",
    specality: ["Dialectical Behavior Therapy (DBT)", "Trauma-Focused Therapy"],
    languages: ["English", "Spanish"],
    insurance: [
      { provider: "Blue Cross Blue Shield", plan: "PPO" },
      { provider: "Aetna", plan: "HMO" }
    ],
    contact: {
      phone: "12345678901",
      email: "emily.johnson@example.com"
    }
  },
  {
    first_name: "Michael",
    last_name: "Smith",
    specality: ["Cognitive Behavioral Therapy (CBT)", "Mindfulness Therapy"],
    languages: ["English"],
    insurance: [
      { provider: "UnitedHealthcare", plan: "Gold Plan" },
      { provider: "Cigna", plan: "Silver Plan" }
    ],
    contact: {
      phone: "98765432102",
      email: "michael.smith@example.com"
    }
  },
  {
    first_name: "Sophia",
    last_name: "Brown",
    specality: ["Evidence-Based Therapy", "Acceptance and Commitment Therapy (ACT)"],
    languages: ["English", "French"],
    insurance: [
      { provider: "Blue Cross Blue Shield", plan: "PPO" },
      { provider: "Humana", plan: "Bronze Plan" }
    ],
    contact: {
      phone: "11122233303",
      email: "sophia.brown@example.com"
    }
  },
  {
    first_name: "Daniel",
    last_name: "Martinez",
    specality: ["Psychiatry", "Medication Management"],
    languages: ["English", "Portuguese"],
    insurance: [
      { provider: "Aetna", plan: "Comprehensive Plan" },
      { provider: "Cigna", plan: "Silver Plan" }
    ],
    contact: {
      phone: "44455566604",
      email: "daniel.martinez@example.com"
    }
  },
  {
    first_name: "Olivia",
    last_name: "Garcia",
    specality: ["Child Psychiatry", "Family Therapy"],
    languages: ["English", "Spanish"],
    insurance: [
      { provider: "Medicare", plan: "Part B" },
      { provider: "Humana", plan: "Gold Plan" }
    ],
    contact: {
      phone: "77788899905",
      email: "olivia.garcia@example.com"
    }
  },
  {
    first_name: "James",
    last_name: "Williams",
    specality: ["Addiction Counseling", "Motivational Interviewing"],
    languages: ["English"],
    insurance: [
      { provider: "UnitedHealthcare", plan: "Silver Plan" },
      { provider: "Aetna", plan: "Gold Plan" }
    ],
    contact: {
      phone: "12398765406",
      email: "james.williams@example.com"
    }
  },
  {
    first_name: "Ava",
    last_name: "Lopez",
    specality: ["Somatic Therapy", "Trauma-Informed Care"],
    languages: ["English", "Tagalog"],
    insurance: [
      { provider: "Blue Cross Blue Shield", plan: "HMO" },
      { provider: "Cigna", plan: "Platinum Plan" }
    ],
    contact: {
      phone: "23456789007",
      email: "ava.lopez@example.com"
    }
  },
  {
    first_name: "William",
    last_name: "Harris",
    specality: ["Psychodynamic Therapy", "Grief Counseling"],
    languages: ["English"],
    insurance: [
      { provider: "Medicare", plan: "Part C" },
      { provider: "Kaiser Permanente", plan: "HMO Plan" }
    ],
    contact: {
      phone: "34567890108",
      email: "william.harris@example.com"
    }
  },
  {
    first_name: "Isabella",
    last_name: "Clark",
    specality: ["Couples Therapy", "Marriage Counseling"],
    languages: ["English", "Mandarin"],
    insurance: [
      { provider: "Aetna", plan: "Basic Plan" },
      { provider: "UnitedHealthcare", plan: "Platinum Plan" }
    ],
    contact: {
      phone: "45678901209",
      email: "isabella.clark@example.com"
    }
  },
  {
    first_name: "Benjamin",
    last_name: "Lee",
    specality: ["Forensic Psychiatry", "Schizophrenia Treatment"],
    languages: ["English", "Korean"],
    insurance: [
      { provider: "Cigna", plan: "HMO Plan" },
      { provider: "Blue Cross Blue Shield", plan: "Gold Plan" }
    ],
    contact: {
      phone: "56789012310",
      email: "benjamin.lee@example.com"
    }
  }
];

// Seed route to populate the database. Go to postman and put seed GET
seedRouter.get("/", async (req, res) => {
  try {
    await Provider.deleteMany(); // Clears existing providers
    const insertedProviders = await Provider.insertMany(providers);
    res.status(201).json({
      message: "Database seeded successfully!",
      providers: insertedProviders
    });
  } catch (error) {
    res.status(500).json({ message: "Seeding failed", error });
  }
});

export default seedRouter;