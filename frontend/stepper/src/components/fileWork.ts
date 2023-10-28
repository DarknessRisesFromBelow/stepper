import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export function readFile(path:string)
{      
	let data = "";
	Filesystem.readFile({path: path, directory: Directory.Library, encoding: Encoding.UTF8, }).then(text=>
	{
		console.log("read text. content was");
		console.log(text.data);
		data = text.data as string;
	});
	return data;
}

export function writeFile(path:string, data:string)
{
	Filesystem.writeFile({path: path, data: data, directory: Directory.Library, encoding: Encoding.UTF8, recursive: true});
}