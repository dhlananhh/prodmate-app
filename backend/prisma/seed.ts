import { prisma } from '../src/config/database';

async function main() {
  // seed todos
  await prisma.todo.createMany({
    data: [
      {
        title: "Read TypeScript documentation",
        description: "Go through official docs and tutorials",
        priority: "high",
        status: "pending",
      },
      {
        title: "Go to the gym",
        description: "Cardio workout for 30 minutes",
        priority: "medium",
        status: "in-progress",
      },
      {
        title: "Prepare project presentation",
        description: "Create slides and rehearse speech",
        priority: "high",
        status: "pending",
      },
    ],
    skipDuplicates: true
  });

  // seed habits
  await prisma.habit.createMany({
    data: [
      {
        name: "Drink 2 liters of water",
        frequency: "daily",
      },
      {
        name: "Jogging",
        frequency: "weekly",
      },
    ],
    skipDuplicates: true
  });

  // seed events
  await prisma.event.createMany({
    data: [
      {
        title: "Team meeting",
        description: "Discuss project progress",
        date: new Date("2026-04-25T10:00:00Z"),
        type: "meeting",
      },
      {
        title: "Final exam",
        description: "Web development course",
        date: new Date("2026-05-10T08:00:00Z"),
        type: "exam",
      },
    ],
    skipDuplicates: true
  });

  console.log("✅ Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
