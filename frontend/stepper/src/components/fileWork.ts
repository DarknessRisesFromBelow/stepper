import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export function readFile(path:string)
{      
	//const data = "";
	return Filesystem.readFile({path: path, directory: Directory.Library, encoding: Encoding.UTF8, }).then(text=>
	{
		console.log("read text. content was");
		console.log(text.data);
		return text.data as string;
	});
}

export function writeFile(path:string, data:string)
{
	Filesystem.writeFile({path: path, data: data, directory: Directory.Library, encoding: Encoding.UTF8, recursive: true});
}