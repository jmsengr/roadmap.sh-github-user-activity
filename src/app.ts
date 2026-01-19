import { createInterface } from "readline";
import kleur from "kleur";
// import axios from "axios";

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

function formatTime(date: string): string {
	const new_date = new Date(date);

	return new_date.toLocaleString("en-GB", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
}

function printOutput(events: any[]) {
	const latest_date = new Date(events[0].created_at).toLocaleDateString("en-GB");
	const oldest_date = new Date(events.at(-1).created_at).toLocaleDateString("en-GB");

	console.log("--------------------------------------------------------------");
	console.log(`Recent user activity from ${kleur.green(oldest_date)} - ${kleur.green(latest_date)}`);

	console.log("");
	console.log("");

	for (let event of events) {
		// PushEvent → source code changes
		if (event.type === "PushEvent") {
			console.log(`Pushed a commit on ${kleur.yellow(event.repo.name)} at ${kleur.green(formatTime(event.created_at))}`);
		}

		//CreateEvent → branch / tag / repo created
		if (event.type === "CreateEvent") {
			const refLabel = event.payload.ref ? `"${kleur.blue(event.payload.ref)}"` : "";

			console.log(
				`Created a ${event.payload.ref_type} ${refLabel} on ${kleur.yellow(event.repo.name)} at ${kleur.green(formatTime(event.created_at))}`,
			);
		}

		// DeleteEvent → branch / tag deleted
		if (event.type === "DeleteEvent") {
			const refLabel = event.payload.ref ? `"${kleur.red(event.payload.ref)}"` : "";
			console.log(
				`Deleted a ${event.payload.ref_type} ${refLabel} on ${kleur.yellow(event.repo.name)} at ${kleur.green(formatTime(event.created_at))})`,
			);
		}

		// PullRequestEvent → PR lifecycle activity
		if (event.type === "PullRequestEvent") {
			console.log(`Pull request ${event.payload.action} on ${kleur.yellow(event.repo.name)} at ${kleur.green(formatTime(event.created_at))}`);
		}

		// IssuesEvent → issue opened / closed / reopened
		if (event.type === "IssuesEvent") {
			console.log(`Issue ${event.payload.action} on ${kleur.yellow(event.repo.name)} at ${kleur.green(formatTime(event.created_at))}`);
		}

		// IssueCommentEvent → discussion activity
		if (event.type === "IssueCommentEvent") {
			console.log(
				`Comment ${event.payload.action} on an issue in ${kleur.yellow(event.repo.name)} at ${kleur.green(formatTime(event.created_at))}`,
			);
		}

		// ForkEvent → repository forked
		if (event.type === "ForkEvent") {
			console.log(`Forked ${kleur.yellow(event.repo.name)} at ${kleur.green(formatTime(event.created_at))}`);
		}

		// WatchEvent → repository starred
		if (event.type === "WatchEvent") {
			console.log(`Starred ${kleur.yellow(event.repo.name)} at ${kleur.green(formatTime(event.created_at))}`);
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
			console.log(kleur.red("No command input"));
			prompt();

			return;
		}

		const flags: string[] = input.trim().split(" ");

		if (flags[0] !== "github-activity") {
			console.log(kleur.red("Invalid flags"));
			prompt();

			return;
		} else if (flags.length === 1) {
			console.log(kleur.red("Missing 2nd flag"));
			prompt();

			return;
		}

		const username: string | undefined = flags[1];

		try {
			const response = await fetch(`https://api.github.com/users/${username}/events`);

			if (!response.ok) {
				console.log(kleur.red("User not found"));
				prompt();

				return;
			}

			const data = await response.json();

			if (!data || data.length <= 0) {
				console.log(kleur.red("User has no recent activity"));
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
