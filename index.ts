import chalk from "chalk";
import cac from "cac";
import { prompt, Separator, QuestionCollection } from "inquirer";

// console.log(chalk.blue("Hello World!"));
// console.log(chalk.red("こんにちは！"));

const cli = cac();
cli.command("hello [name]", "Enter your name").action(() => {
  const name = process.argv[3];
  if (!name) {
    console.error(chalk.red("Please pass one argument!"));
    process.exit(1);
  }
  console.log(chalk.blue(`hello ${name}.`));
});

cli
  .command("dev [name]", "Start dev action")
  .option("-t", "test mode")
  .option("-i", "test2 mode")
  .action((name, options) => {
    console.log("name: ", name);
    console.log("options: ", options);
  });

cli
  .command("question", "Start question mode")
  .option("-n", "name question")
  .option("-f", "fruits mode")
  .action(async options => {
    let name: string = "";
    const q1: QuestionCollection = {
      type: "input",
      message: "what's your name?",
      name: "name"
    };
    await prompt(q1).then(answer => {
      name = answer.name;
      console.log("your name is: ", chalk.red(answer.name));
    });

    const q2: QuestionCollection = {
      type: "list",
      message: "what do you like?",
      name: "fruits",
      choices: [
        "orange",
        "banana",
        "melon",
        "cherry",
      ],
    };
    await prompt(q2).then(answer => {
      console.log("your choice: ", chalk.blue(answer.fruits));
    });

    const q3: QuestionCollection = {
      type: "checkbox",
      message: "select colors",
      name: "colors",
      choices: [
        new Separator(chalk.green("==============")),
        "red",
        "blue",
        "pink",
        "yellow",
        new Separator(chalk.green("==============")),
      ],
      validate: answer => {
        if (answer.length < 1) return "You must choose!";
        return true;
      }
    };
    await prompt(q3).then(answer => {
      console.log("your color: ", chalk.green(answer.colors));
    });
  });

cli.version('0.1');
cli.help();
cli.parse();
