import Faker from "faker";
import { define } from "typeorm-seeding";
import { TypeExams } from "../../models/TypeExams";

define(TypeExams, (faker: typeof Faker) => {
  const title = faker.name.firstName();

  const type_exam = new TypeExams();
  type_exam.title = title;
  return type_exam;
});
