using stepper.ServerHandling;
using stepper.Constants;

namespace stepper
{
	class Entry
	{
		public static void Main(string[] args)
		{
			string certificate = "./certificate.pfx";
			SecureHandler.StartServer(443,certificate,Consts.PfxPassword);		
			//SecureHandler.StartServer(443,certificate,Consts.PfxPassword);	
			//new Handler(8080).StartServer();		
		}
	}
}