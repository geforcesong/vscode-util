import * as vscode from 'vscode';

export class Lines {
    static sort(sortAlgorithm : any) {
        let textEditor = vscode.window.activeTextEditor;
        let selection = Lines.getSelection(textEditor);
        if (!selection || selection.isSingleLine)
            return;
        let lines = [];
        let startLine = selection.start.line;
        let endLine = selection.end.line;
        for (let i = startLine; i <= endLine; i++) {
            var text = textEditor.document.lineAt(i).text;
            lines.push(text);
        }
        lines.sort(sortAlgorithm);
        textEditor.edit((builder) => {
            var range = new vscode.Range(startLine, 0, endLine, textEditor.document.lineAt(endLine).text.length);
            builder.replace(range, lines.join("\n"));
        });
    }

    static sortDesc() {
        Lines.sort((a, b) => {
            if (a > b)
                return -1;
            else if (a == b)
                return 0;
            else
                return 1;
        });
    }

    private static getSelection(textEditor: vscode.TextEditor) {
        if (!textEditor)
            return null;
        return textEditor.selection;
    }
}
