// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { formatDate } from './utils';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

function initialHanlder() {
	vscode.window.showInformationMessage('md-editor-helper is initialing');
	vscode.workspace.getConfiguration().update("markdown.styles", [ "https://socialsimulation.net/css/post.min.css"], vscode.ConfigurationTarget.Workspace).then(() => {
		vscode.window.showInformationMessage('Initialzized success md-editor-helper!');
	}, (err) => {
		vscode.window.showErrorMessage('Initialzized error md-editor-helper! ' + err.message);
	});
}
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	vscode.window.showInformationMessage('md-editor-helper is activing!');

	initialHanlder();

	// const configuredView = vscode.workspace.getConfiguration().get('conf.view.showOnWindowOpen');
	// console.log('configuredView', configuredView);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const mainDisposable = vscode.commands.registerCommand('md-editor-helper.main', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		initialHanlder();
	});

	// 子菜单命令集合
	const subMenuCommandList = [
		// 选中字符反转
		vscode.commands.registerCommand('md-editor-helper.context.reverse', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;  // No open text editor
			}
			const document = editor.document;
			const selection = editor.selection;
			// Get the word within the selection
			const word = document.getText(selection);
			const reversed = word.split('').reverse().join('');
			editor.edit(editBuilder => {
				editBuilder.replace(selection, reversed);
			});
		}),
		// 选中字符加粗
		vscode.commands.registerCommand('md-editor-helper.context.bold', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;  // No open text editor
			}
			const document = editor.document;
			const selection = editor.selection;
			// Get the word within the selection
			const word = document.getText(selection);
			editor.edit(editBuilder => {
				editBuilder.replace(selection, `**${word}**`);
			});
		}),
		// 新建post
		vscode.commands.registerCommand('md-editor-helper.context.postCreate', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;  // No open text editor
			}
			const document = editor.document;
			const selection = editor.selection;
			// Get the word within the selection
			const word = document.getText(selection);
			editor.edit(editBuilder => {
				editBuilder.replace(selection, `---\n` +
				`date: ${formatDate('YYYY_MM_DD HH:mm:ss')}\n` +
				`title: ${word}\n` +
				`categories: \n` +
				`- [news]\n` +
				`thumbnail_in_body: \n` +
				`---\n`);
			});
		}),
	];

	context.subscriptions.push(mainDisposable, ...subMenuCommandList);
}

// This method is called when your extension is deactivated
export function deactivate() {}
