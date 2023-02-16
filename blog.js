// default function to update logic
function updateBlogCategoriesLinks(){
  document.querySelectorAll('.archive-group-list li').forEach(li =>{
    var catName = li.querySelector('a').href.split('/').at(-1);
    li.querySelector('a').href = '';
    li.querySelector('a').href = '/blog?category='+catName+'&format=json-pretty';
    li.querySelector('a').addEventListener('click', function(evt){
      evt.preventDefault();
      fetchBogCategoryPosts(this.href);
    });
  });
}
// fetching and parsing data
function fetchBogCategoryPosts(blogCatURL){
  fetch(blogCatURL)
  .then(res=> {return res.json()})
  .then(data => {
    if(data.items.length > 0) {
      var blogHTML = '';
      data.items.forEach(item=> {
        blogHTML += buildArticle(item);
      });
      if(data.pagination){
        blogHTML += '<nav class="blog-list-pagination">';
        if(data.pagination.prevPageUrl){
          blogHTML += buildPrevPageUrl(data.pagination.prevPageUrl);
        }
        blogHTML += buildNextPageUrl(data.pagination.nextPageUrl);
        blogHTML += '</nav>';
      }
      document.querySelector('.blog-basic-grid.collection-content-wrapper').innerHTML = '';
      document.querySelector('.blog-basic-grid.collection-content-wrapper').innerHTML =blogHTML;
    }
  });
}
// build blog HTML
function buildArticle(item){
  return `<article class="blog-basic-grid--container entry blog-item is-loaded"> <div> <a href="${item.fullUrl}" class="image-wrapper preSlide slideIn" data-animation-role="image" style="transition-timing-function: ease; transition-duration: 0.6s; transition-delay: 0.267358s; overflow: hidden;"> <img data-src="${item.assetUrl}" data-image="${item.assetUrl}" data-image-dimensions="6000x4000" data-image-focal-point="0.5,0.5" data-load="false" class="image" data-parent-ratio="1.5" style="left: -1.75px; top: 0px; width: 388.5px; height: 259px; position: absolute;" alt="${item.title}" data-image-resolution="500w" src="${item.assetUrl}?format=500w"> </a> </div> <div class="blog-article-spacer"></div> <div class="blog-basic-grid--text"> <div class="blog-meta-section"> <span class="blog-meta-primary"> <span class="blog-categories-list"> <a href="/blog/category/${item.categories[0]}" class="blog-categories">${item.categories[0]} </a> </span> <span class="blog-author">${item.author.displayName}</span> <time class="blog-date preFade" pubdate="" data-animation-role="date" style="transition-timing-function: ease; transition-duration: 0.6s; transition-delay: 0.270466s;">2/13/23</time> </span> <span class="blog-meta-delimiter"></span> <span class="blog-meta-delimiter blog-category-delimiter"></span> <span class="blog-meta-secondary"> <span class="blog-categories-list"> <a href="/blog/category/${item.categories[0]}" class="blog-categories"> ${item.categories[0]} </a> </span> <span class="blog-author">${item.author.displayName}</span> <time class="blog-date preFade" pubdate="" data-animation-role="date"  style="transition-timing-function: ease; transition-duration: 0.6s; transition-delay: 0.273575s;">2/13/23</time> </span> </div> <h1 class="blog-title preSlide slideIn" style="transition-timing-function: ease; transition-duration: 0.6s; transition-delay: 0.276684s;"> <a href="${item.fullUrl}" data-no-animation="">${item.title}</a> </h1> <div class="blog-excerpt"> <div class="blog-excerpt-wrapper"> <p class="preFade" style="white-space: pre-wrap; transition-timing-function: ease; transition-duration: 0.6s; transition-delay: 0.279793s;">${item.excerpt}</p> </div> </div> <a class="blog-more-link preFade fadeIn"  href="${item.fullUrl}" data-animation-role="content" style="transition-timing-function: ease; transition-duration: 0.6s; transition-delay: 0.282902s;">Read More</a> </div> </article>`;
}
// build navigation link
function buildPrevPageUrl(prevPageUrl) {
  return `<div class="newer"><a href="${prevPageUrl}" rel="prev"><div class="blog-list-pagination-icon icon icon--stroke"><svg class="caret-left-icon--small" viewBox="0 0 9 16"><polyline fill="none" stroke-miterlimit="10" points="7.3,14.7 2.5,8 7.3,1.2 "></polyline></svg></div><span class="prev-label">Newer Posts</span></a></div>`;
}
// build navigation link
function buildNextPageUrl(nextPageUrl){
  return `<div class="older"><a href="${nextPageUrl}" rel="next"><span class="next-label">Older Posts</span><div class="blog-list-pagination-icon icon icon--stroke"><svg class="caret-right-icon--small" viewBox="0 0 9 16"><polyline fill="none" stroke-miterlimit="10" points="1.6,1.2 6.5,7.9 1.6,14.7 "></polyline></svg></div></a></div>`;
}
// init updateBlogCategoriesLinks() on include
updateBlogCategoriesLinks();
