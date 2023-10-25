using System;
using OneSignalApi.Api;
using OneSignalApi.Client;
using OneSignalApi.Model;

namespace stepper.accounts
{
	public class account
	{
		int steps;
		string pfpURL, username,id;
		public static List<account> accounts = new();

		public account(string pfpURL, string username)
		{
			this.id = "stpr0" + accounts.Count;
			this.steps = 0;
			this.pfpURL = pfpURL;
			this.username = username;
			accounts.Add(this);
		}

		public void setSteps(int steps) => this.steps = steps;

		public int getSteps() => this.steps;
		public string getID() => this.id;
		public string getUN() => this.username;

		public void sendPersonalizedMessage()
		{
			Console.WriteLine("starting messaging cycle");
			account mostWalked = this;
			for(int i = 0; i < accounts.Count; i++)
			{
				if(accounts[i].getSteps() > mostWalked.getSteps())
				{
					mostWalked = accounts[i];
				}
			}

			if(mostWalked.getSteps() != getSteps())
			{
				Console.WriteLine("sending winning losing to " + id);
				Configuration config = new Configuration();
				config.BasePath = "https://onesignal.com/api/v1";
				
				// Configure Bearer token for authorization: app_key
				config.AccessToken = "YzQ0MjYxMDAtOTY2Ni00MWIwLWEzZGUtYmU4ZjUwMzAwZDky";
			
				var apiInstance = new DefaultApi(config);
            	var notification = new Notification(includeExternalUserIds: new List<string>() { this.id }, subtitle: new(en: mostWalked.getUN() + " currently has " + (mostWalked.getSteps() - getSteps()) + " steps more than you, but it's not too late! you can still catch up."), headings: new(en: mostWalked.getUN() + " currently has " + (mostWalked.getSteps() - getSteps()) + " steps more than you, but it's not too late! you can still catch up."), contents: new(en: "click here to update your step count and see the full leaderboard"), appId: "bbb1bb87-4bdb-4dea-845e-22f81f9bc787"); // Notification | 

            	try
				{
					CreateNotificationSuccessResponse result = apiInstance.CreateNotification(notification);
					Console.WriteLine(result);
				}
				catch (ApiException  e)
				{
					Console.WriteLine("Status Code: "+ e.ErrorCode);
					Console.WriteLine(e.StackTrace);
				}
			}
			else
			{
				Console.WriteLine("sending winning message to " + id);
				Configuration config = new Configuration();
				config.BasePath = "https://onesignal.com/api/v1";
				
				// Configure Bearer token for authorization: app_key
				config.AccessToken = Environment.GetEnvironmentVariable("OneSignalAuthKey");
			
				var apiInstance = new DefaultApi(config);
            	var notification = new Notification(includeExternalUserIds: new List<string>() { this.id }, subtitle: new(en: "you are currently in the lead with " + getSteps() + " steps! well done!"), headings: new(en: "you are currently in the lead with " + getSteps() + " steps! well done!"), contents: new(en: "click here to update your step count and see the full leaderboard"), appId: Environment.GetEnvironmentVariable("OneSignalAppID"));

            	try
				{
					CreateNotificationSuccessResponse result = apiInstance.CreateNotification(notification);
					Console.WriteLine(result);
				}
				catch (ApiException  e)
				{
					Console.WriteLine("Status Code: "+ e.ErrorCode);
					Console.WriteLine(e.StackTrace);
				}
			}	
		}

		public override string ToString()
		{
			return "" + this.username + "," + this.pfpURL + "," + this.steps + ",";
		}

	}
}