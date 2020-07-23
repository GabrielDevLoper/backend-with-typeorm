import Faker from "faker";
import { define } from "typeorm-seeding";
import { Exams } from "../../models/Exams";

define(Exams, (faker: typeof Faker) => {
  const description = faker.name.firstName();

  const exam = new Exams();
  exam.description = description;
  return exam;
});
