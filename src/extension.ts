// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { formatDate } from './utils';
import snippetList from './snippetList.json';

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
/**
 * 替换编辑器选中词
 * @param replacer(word)
 * @returns string | undefined
 */
function editorSelectionReplacer(replacer: (word: string) => string | undefined) {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;  // No open text editor
	}
	const document = editor.document;
	const selection = editor.selection;
	// Get the word within the selection
	const word = document.getText(selection);
	const text = replacer(word);
	if (text) {
		editor.edit(editBuilder => {
			editBuilder.replace(selection, text);
		});
	}
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
		vscode.commands.registerCommand('md-editor-helper.context.reverse', () => {
			editorSelectionReplacer(word => word.split('').reverse().join(''));
		}),
		// 选中字符加粗
		// vscode.commands.registerCommand('md-editor-helper.context.bold', () => {
		// 	editorSelectionReplacer(word => `**${word}**`);
		// }),
		// 选中字符加粗取消
		vscode.commands.registerCommand('md-editor-helper.context.boldCancel', () => {
			editorSelectionReplacer(word => {
				const regex = /\*\*(.+)\*\*/;
				if (regex.test(word)) {
					return word.replace(regex, '$1');
				}
			});
		}),
		// 无序列表
		// vscode.commands.registerCommand('md-editor-helper.context.listUnsorted', () => {
		// 	editorSelectionReplacer(word => `- ${word}`);
		// }),
		// 有序列表
		// vscode.commands.registerCommand('md-editor-helper.context.listSorted', () => {
		// 	editorSelectionReplacer(word => `1. ${word}`);
		// }),
	];

	const dateStr = formatDate('YYYY_MM_DD HH:mm:ss');

	snippetList.forEach(item => {
		const body: Array<string> | undefined = item.body || [];
		if (body.length === 0) {
			return;
		}
		const command = vscode.commands.registerCommand(`md-editor-helper.context.${item.prefix}`, () => {
			const bodyResult = body.map(it => {
				return it.replace('$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE $CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND', dateStr)
						.replace(/(\$$[^1]+)/, '');
			});

			editorSelectionReplacer(word => {
				const text = bodyResult.join('\n').replace('$1', word);
				return `${text}`;
				return `${text} ${word}`
			});
		});

		subMenuCommandList.push(command);
	});


	context.subscriptions.push(mainDisposable, ...subMenuCommandList);

	vscode.languages.registerHoverProvider('markdown', {
		provideHover(document, position, token) {
			console.log('aa', document, position, token)
			return {
				contents: ['Hover Content']
			};
		}
	  });
}

// This method is called when your extension is deactivated
export function deactivate() {}
