import { CommentSyntaxNode, commentSyntaxNodeFactory, SyntaxTree } from './index';

describe('comment syntax factory', () => {
    it('should return a falsy value when the segment is not a comment', () => {
        const result = commentSyntaxNodeFactory(new SyntaxTree('1234'))(0);
        expect(result).toBeFalsy();
    })

    it('should return a comment node', () => {
        const result = commentSyntaxNodeFactory(new SyntaxTree('# a comment'))(0) as CommentSyntaxNode;
        expect(result.span.from).toBe(0);
        expect(result.span.to).toBe(10);
    })

    it('should not detect comment on next line', () => {
        const result = commentSyntaxNodeFactory(new SyntaxTree(`
# a comment`))(0);
        expect(result).toBeFalsy();
    })

    it('should detect a comment after spaces', () => {
        const result = commentSyntaxNodeFactory(new SyntaxTree(`    # a comment`))(0) as CommentSyntaxNode;
        expect(result.span.from).toBe(0);
        expect(result.span.to).toBe(14);
    })

    it('should detect a comment after spaces', () => {
        const result = commentSyntaxNodeFactory(new SyntaxTree(`    # a comment
another line`))(0) as CommentSyntaxNode;
        expect(result.span.from).toBe(0);
        expect(result.span.to).toBe(15); // contains the newline character
    })

    it('should detect a comment from pointed character', () => {
        const result = commentSyntaxNodeFactory(new SyntaxTree(`    
  # a comment
another line`))(5) as CommentSyntaxNode;
        expect(result.span.from).toBe(5);
        expect(result.span.to).toBe(18);
    })
})
