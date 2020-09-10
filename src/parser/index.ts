export function parse(data: string) {

}

export class SyntaxTree {
    constructor(public data: string) {}
}

abstract class SyntaxNode {
    public span: {
        from: number,
        to: number,
    }

    public offset: number;

    public children: SyntaxNode[] = []
}

export const commentSyntaxNodeFactory = (syntaxTree: SyntaxTree) =>
    (from: SyntaxNode["span"]["from"]) => {

    /** The data segment to consider */
    const segment = syntaxTree.data.substring(from);
    if (!/^[^\S\r\n]*#/.test(segment)) {
        return false; // The segment is not a comment, returning
    }

    const offset = /^\s*/.exec(segment)[0]?.length || 0;

    const nextNewLineIndex = segment.indexOf('\n');
    const end = nextNewLineIndex === -1 ? (segment.length - 1) : nextNewLineIndex;

    return new CommentSyntaxNode(syntaxTree, { from, to: from + end }, offset)
}

export class CommentSyntaxNode extends SyntaxNode {
    constructor(
        syntaxTree: SyntaxTree,
        public span: SyntaxNode['span'],
        public offset = 0) {
        super();
    }
}
