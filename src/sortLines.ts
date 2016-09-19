import * as vscode from 'vscode';

export class SortLines {
    static sort() {
        let textEditor = vscode.window.activeTextEditor;
        let selection = SortLines._getSelection(textEditor);
        if (!selection)
            return;
        let lines = [];
        let startLine = selection.start.line;
        let endLine = selection.end.line;
        for (let i = startLine; i <= endLine; i++) {
            var text = textEditor.document.lineAt(i).text;
            lines.push(text);
        }
        lines.sort();
        textEditor.edit((builder) => {
            var range = new vscode.Range(startLine, 0, endLine, textEditor.document.lineAt(endLine).text.length);
            builder.replace(range, lines.join("\n"));
        });
    }

    private static _getSelection(textEditor:vscode.TextEditor) {
        if(!textEditor)
        return null;
        let selection = textEditor.selection;
        if (!selection || selection.isSingleLine) {
            return null;
        }
        return selection;
    }
}
