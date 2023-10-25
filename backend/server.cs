namespace stepper.ServerHandling
{
	using System;  
	using System.IO;  
	using System.Net;
	using System.Web;
	using System.Net.Sockets;
	using System.Net.Security;
	using System.Security.Authentication;
	using System.Security.Cryptography.X509Certificates;  
	using System.Text;  
	using System.Threading;
	using stepper.accounts;
	using stepper.sorting;


	public class SecureHandler
	{
		static X509Certificate serverCertificate = null;
		// The certificate parameter specifies the name of the file
		// containing the machine certificate.

		//public SecureHandler()
		//{
		//	manager = new HomeManager();
		//}


		/// <summary>
		/// Starts a server.
		/// </summary>
		///
		/// <param name="port">The port</param>
		/// <param name="certificate">The certificate</param>
		/// <param name="password">The password</param>
		public static void StartServer(int port, string certificate,string password)
		{
			serverCertificate = new X509Certificate(certificate, password);
			TcpListener listener = new TcpListener(IPAddress.Any, port);
			listener.Start();
			while (true)
			{
				Console.WriteLine("Waiting for a client to connect...");
				TcpClient client = listener.AcceptTcpClient();
				ProcessClient(client);
			}
		}

		/// <summary>
		/// Sends data back to the client.
		/// </summary>
		///
		/// <param name="data">The data</param>
		/// <param name="stream">The stream</param>
		static void sendData(string data, ref SslStream stream)
		{
			String sBuffer = "";  
			int iTotBytes = Encoding.UTF8.GetBytes(data).Length;  
			sBuffer +=  "HTTP/1.1 200\r\n";  
			sBuffer += "Server: BBIL-SERVER-0\r\n";
			sBuffer += "Access-Control-Allow-Origin: *\r\n"; 
			sBuffer += "Access-Control-Allow-Methods: GET\r\n";
			sBuffer += "Content-Type: text/html \r\n";  
			sBuffer += "Accept-Ranges: bytes\r\n";  
			sBuffer += "Content-Length: " + iTotBytes + "\r\n\r\n";  
			Byte[] bSendData = Encoding.ASCII.GetBytes(sBuffer);  
			stream.Write(bSendData);
			Byte[] secondData = Encoding.UTF8.GetBytes(data);
			stream.Write(secondData);
		}

		static void respondToPreflight(ref SslStream stream)
		{
			String sBuffer = "";  
			sBuffer +=  "HTTP/1.1 204\n";  
			sBuffer += "Connection: keep-alive\n";
			sBuffer += "Access-Control-Allow-Origin: *\n";
			sBuffer += "Access-Control-Allow-Headers: ngrok-skip-browser-warning\n"; 
			sBuffer += "Access-Control-Allow-Methods: GET\n";
			sBuffer += "Access-Control-Max-Age: 86400\n\n";  
			Byte[] bSendData = Encoding.ASCII.GetBytes(sBuffer);  
			stream.Write(bSendData);
		}


		/// <summary>
		/// function processes the HTTP/S request.
		/// </summary>
		///
		/// <param name="client">The client</param>
		static void ProcessClient (TcpClient client)
		{
			SslStream sslStream = new SslStream(client.GetStream(), false);
			try
			{
				
				sslStream.AuthenticateAsServer(serverCertificate, clientCertificateRequired: false, checkCertificateRevocation: false);
				
				int iStartPos = 0;
				StringBuilder messageData = new StringBuilder();
				Byte[] bReceive = new Byte[1024];  
				int i = sslStream.Read(bReceive, 0, bReceive.Length);  
				//Convert Byte to String
				Decoder decoder = Encoding.UTF8.GetDecoder();  
				char[] chars = new char[decoder.GetCharCount(bReceive,0,i)];
				decoder.GetChars(bReceive, 0, i, chars,0);
				messageData.Append(chars);
				string sBuffer = messageData.ToString();  
				// Look for HTTP request  
				iStartPos = sBuffer.IndexOf("HTTP", 1);  
				// Get the HTTP text and version e.g. it will return "HTTP/1.1"  
				string sHttpVersion = sBuffer.Substring(iStartPos, 8);  
				// Extract the Requested Type and Requested file/directory  
				string sRequest = sBuffer.Substring(0, iStartPos - 1);  
				//Replace backslash with Forward Slash, if Any  
				sRequest = sRequest.Replace("\\", "/").Replace("%22","'").Replace("%20", " ").Replace("GET /", "").Replace("&",",");
				sRequest = HttpUtility.UrlDecode(sRequest);
				bool shouldAnswer = true;
				if(sRequest.Contains("OPTIONS /"))
				{
					shouldAnswer=false;
					respondToPreflight(ref sslStream);
				}

				try
				{
					if(shouldAnswer)
					{
						if(sRequest.Contains("CreateUser"))
						{
							string[] userData = sRequest.Replace("CreateUser", "").Split("|||");
							account acc = new account(userData[0], userData[1]);
							sendData("user created successfully, uid=" + acc.getID(), ref sslStream);
						}
						else if(sRequest.Contains("setSteps"))
						{
							string[] data = sRequest.Replace("setSteps", "").Split(",");
							account.accounts[int.Parse(data[1].Replace("stpr0", ""))].setSteps(int.Parse(data[0]));
							sendData("successfully set step count", ref sslStream);
						}
						else if(sRequest.Contains("sendMsg"))
						{
							for(int o = 0; o < account.accounts.Count; o++)
							{
								account.accounts[o].sendPersonalizedMessage();
							}
							sendData("successfully sent the messages.", ref sslStream);
						}
						else if(sRequest.Contains("getLeaderboard"))
						{
							sendData(algorithms.formattedGnomeSort(account.accounts.ToArray()), ref sslStream);
						}
						else
						{
							sendData("TEST DATA,https://www.law.berkeley.edu/wp-content/uploads/2015/04/Blank-profile.png,1234,TEST DATA,https://www.law.berkeley.edu/wp-content/uploads/2015/04/Blank-profile.png,1234,TEST DATA,https://www.law.berkeley.edu/wp-content/uploads/2015/04/Blank-profile.png,1234", ref sslStream);
						}
						sslStream.Close();
						client.Close();
					}
				}
				catch(Exception e)
				{
					sendData("error occured, sorry!", ref sslStream);
					try
					{
						Console.WriteLine("error encountered.\nerror:\t{0}\ncontinuing...", e);
					}
					catch(Exception ex)
					{
						Console.WriteLine("error printing the error message, oops ig... detail of the error: "+ ex);
					}
				}
			}
			catch (AuthenticationException e)
			{
				Console.WriteLine("Exception: {0}", e.Message);
				if (e.InnerException != null)
				{
					Console.WriteLine("Inner exception: {0}", e.InnerException.Message);
				}
				Console.WriteLine ("Authentication failed - closing the connection.");
				sslStream.Close();
				client.Close();
				return;
			}
			finally
			{
				sslStream.Close();
				client.Close();
			}
		}

	}
}