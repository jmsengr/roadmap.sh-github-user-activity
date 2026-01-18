import { createInterface } from "readline";
import kleur from "kleur";
// import axios from "axios";

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

function printOutput(events: any[]) {
	const latest_date = new Date(events[0].created_at).toLocaleDateString("en-GB");
	const oldest_date = new Date(events.at(-1).created_at).toLocaleDateString("en-GB");

	console.log("--------------------------------------------------------------");
	console.log(`Recent user activity from ${kleur.yellow(oldest_date)} - ${kleur.green(latest_date)}`);
	console.log("");

	const pushEvents = new Map<string, number>();
	const createEvents = new Map<string, string>();

	for (let event of events) {
		if (event.type === "PushEvent") {
			const key: string = event.repo.name;
			pushEvents.set(key, (pushEvents.get(key) ?? 0) + 1);
		}
		if (event.type === "CreateEvent") {
			const key: string = event.repo.name;
			createEvents.set(key, event.payload.ref_type);
		}
		if (event.type === "DeleteEvent") {
			const key: string = event.repo.name;
			createEvents.set(key, event.payload.ref_type);
		}
		if (event.type === "CreateEvent") {
			const key: string = event.repo.name;
			createEvents.set(key, event.payload.ref_type);
		}
		if (event.type === "CreateEvent") {
			const key: string = event.repo.name;
			createEvents.set(key, event.payload.ref_type);
		}
	}

	console.log(kleur.bgGreen("PUSH"));
	for (let [repo, count] of pushEvents) {
		console.log(`Push ${count} commits on ${repo}`);
	}

	console.log("");

	console.log(kleur.bgGreen("CREATE"));
	for (let [key, val] of createEvents) {
		switch (val) {
			case "repository":
				console.log(`Created a repository ${key}`);
				break;

			case "branch":
				console.log(`Created a branch ${key}`);
				break;

			case "tag":
				console.log(`Created a tag ${key}`);
				break;

			default:
				break;
		}
	}
}

function prompt() {
	rl.question("> ", async (input: string) => {
		if (input.trim() === "exit") {
			console.log(kleur.green("Program exit"));
			rl.close();

			return;
		}

		if (input.trim().length <= 0) {
			console.clear();
			console.log(kleur.red("No command input"));
			prompt();

			return;
		}

		const flags: string[] = input.trim().split(" ");

		if (flags[0] !== "github-activity") {
			console.clear();
			console.log(kleur.red("Invalid flags"));
			prompt();

			return;
		} else if (flags.length === 1) {
			console.clear();
			console.log(kleur.red("Missing 2nd flag"));
			prompt();

			return;
		}

		const username: string | undefined = flags[1];

		try {
			const response = await fetch(`https://api.github.com/users/${username}/events`);
			const data = await response.json();

			if (data.statusCode === "404") {
				console.log(kleur.red("User not found"));
				prompt();

				return;
			}

			printOutput(data);
		} catch (err) {
			console.log("Error caught: ", err);
		}

		prompt();
	});
}

prompt();
