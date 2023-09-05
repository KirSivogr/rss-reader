export default (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/xml');
    const feedTitle  = doc.querySelector('title').textContent;
    const feedDescription = doc.querySelector('description').textContent;
    const postsArray = Array.from(doc.querySelectorAll('item'));
    const posts = postsArray.map((item) => {
        return {
            title: item.querySelector('title').textContent,
            link: item.querySelector('link').textContent
        }
    });
    const feed = {
        feedTitle,
        feedDescription
    }
    return {
        feed,
        posts
    }
}