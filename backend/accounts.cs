using System;

namespace stepper.accounts
{
	public class account
	{
		int id, steps;
		string pfpURL, username;
		public static List<account> accounts = new();

		public account(string pfpURL, string username)
		{
			this.id = 0;
			this.steps = 0;
			this.pfpURL = pfpURL;
			this.username = username;
			accounts.Add(this);
		}

		public void setSteps(int steps) => this.steps = steps;

		public int getSteps() => this.steps;
		public int getID() => this.id;

		public override string ToString()
		{
			return "" + this.username + "," + this.pfpURL + "," + this.steps + ",";
		}

	}
}