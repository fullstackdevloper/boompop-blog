// default function to update logic
function updateBlogCategoriesLinks(){
  document.querySelectorAll('.archive-group-list li').forEach(li =>{
    li.querySelector('a').addEventListener('click', function(evt){
      evt.preventDefault();
      clearCurrentActiveClass();
      let catName = this.href.split('/').at(-1);
      let NewBlogCatURL  = '/blog?category='+catName+'&format=json-pretty';
      fetchBogCategoryPosts(NewBlogCatURL);
      li.classList.add('li_active');
    });
  });
  initPaginationLinksEvents();
  buildBoompopLoader();
}
// fetching and parsing data
function fetchBogCategoryPosts(blogCatURL){
  // display loader
  showBomompopLoader();
  fetch(blogCatURL)
  .then(res=> {return res.json()})
  .then(data => {
    if(data.items.length > 0){
      var blogHTML = '';
      data.items.forEach(item=> blogHTML += buildArticle(item));
      if(data.pagination){
        blogHTML += '<nav class="blog-list-pagination">';
        if(data.pagination.prevPage){
          blogHTML += buildPrevPageUrl(data.pagination.prevPageUrl);
        }
        if(data.pagination.nextPage){
          blogHTML += buildNextPageUrl(data.pagination.nextPageUrl);
        }
        blogHTML += '</nav>';
      }
      let blogWrapper = '.blog-basic-grid.collection-content-wrapper';
      document.querySelector(blogWrapper).innerHTML = '';
      document.querySelector(blogWrapper).innerHTML = blogHTML;
      let blogSlideWrapper = '.blog-basic-grid.collection-content-wrapper article .preSlide';
      setTimeout(() => {
        document.querySelectorAll(blogSlideWrapper).forEach(item2=>item2.classList.add('slideIn'));
        hideBomompopLoader();
      }, 200);      
      //normalizeWebLinks(blogCatURL);
      initPaginationLinksEvents();      
    }
  });
}
// build blog HTML
function buildArticle(item){
  return `<article class="blog-basic-grid--container entry blog-item is-loaded"> <div> <a href="${item.fullUrl}" class="image-wrapper preSlide" data-animation-role="image" style="transition-timing-function: ease; transition-duration: 0.6s; transition-delay: 0.267358s; overflow: hidden;"> <img data-src="${item.assetUrl}" data-image="${item.assetUrl}" data-image-dimensions="6000x4000" data-image-focal-point="0.5,0.5" data-load="false" class="image" data-parent-ratio="1.5" style="left: -1.75px; top: 0px; width: 388.5px; height: 259px; position: absolute;" alt="${item.title}" data-image-resolution="500w" src="${item.assetUrl}?format=500w"> </a> </div> <div class="blog-article-spacer"></div> <div class="blog-basic-grid--text"> <div class="blog-meta-section"> <span class="blog-meta-primary"> <span class="blog-categories-list"> <a href="/blog/category/${item.categories[0]}" class="blog-categories">${item.categories[0]} </a> </span> <span class="blog-author">${item.author.displayName}</span> <time class="blog-date preFade" pubdate="" data-animation-role="date" style="transition-timing-function: ease; transition-duration: 0.6s; transition-delay: 0.270466s;">2/13/23</time> </span> <span class="blog-meta-delimiter"></span> <span class="blog-meta-delimiter blog-category-delimiter"></span> <span class="blog-meta-secondary"> <span class="blog-categories-list"> <a href="/blog/category/${item.categories[0]}" class="blog-categories"> ${item.categories[0]} </a> </span> <span class="blog-author">${item.author.displayName}</span> <time class="blog-date preFade" pubdate="" data-animation-role="date"  style="transition-timing-function: ease; transition-duration: 0.6s; transition-delay: 0.273575s;">2/13/23</time> </span> </div> <h1 class="blog-title preSlide" style="transition-timing-function: ease; transition-duration: 0.6s; transition-delay: 0.276684s;"> <a href="${item.fullUrl}" data-no-animation="">${item.title}</a> </h1> <div class="blog-excerpt"> <div class="blog-excerpt-wrapper"> <p class="preFade" style="white-space: pre-wrap; transition-timing-function: ease; transition-duration: 0.6s; transition-delay: 0.279793s;">${item.excerpt}</p> </div> </div> <a class="blog-more-link preFade fadeIn"  href="${item.fullUrl}" data-animation-role="content" style="transition-timing-function: ease; transition-duration: 0.6s; transition-delay: 0.282902s;">Read More</a> </div> </article>`;
}
// build navigation link
function buildPrevPageUrl(prevPageUrl) {
  return `<div class="newer"><a href="${prevPageUrl}" rel="prev"><div class="blog-list-pagination-icon icon icon--stroke"><svg class="caret-left-icon--small" viewBox="0 0 9 16"><polyline fill="none" stroke-miterlimit="10" points="7.3,14.7 2.5,8 7.3,1.2 "></polyline></svg></div><span class="prev-label">Newer Posts</span></a></div>`;
}
// build navigation link
function buildNextPageUrl(nextPageUrl){
  return `<div class="older"><a href="${nextPageUrl}" rel="next"><span class="next-label">Older Posts</span><div class="blog-list-pagination-icon icon icon--stroke"><svg class="caret-right-icon--small" viewBox="0 0 9 16"><polyline fill="none" stroke-miterlimit="10" points="1.6,1.2 6.5,7.9 1.6,14.7 "></polyline></svg></div></a></div>`;
}
// update webpage URL
function normalizeWebLinks(url){
  let newURL = url.replace('&format=json-pretty', '');
  window.history.pushState(null,null,newURL);
}
// init pagination link events
function initPaginationLinksEvents(){
  // next and old link click event
  let nextOldSel = '.blog-list-pagination .older a,.blog-list-pagination .newer a';
  document.querySelectorAll(nextOldSel).forEach(link=>{
    link.addEventListener('click', function(e){
      e.preventDefault();
      let oldLink = this.href+'&format=json-pretty';
      fetchBogCategoryPosts(oldLink);
      document.getElementById('cate').scrollIntoView(true);
    });
  });
}
// clear current class
function clearCurrentActiveClass(){
  document.querySelectorAll('.archive-group-list li').forEach(ele=>ele.classList.remove('li_active'));
}
// build boompop loader
function buildBoompopLoader(){
  var eleToAppend = '.sqs-block.archive-block.sqs-block-archive .sqs-block-content';
  var eleToCopy = '#rotaer svg';
  var eleWraper = document.createElement('div');
  eleWraper.classList.add('blog_rotatr');
  var svgWraper = document.createElement('div');
  svgWraper.classList.add('anim_circle');
  svgWraper.style.marginTop = '15px';

  var loaderStyle = document.createElement('style');
  loaderStyle.innerHTML = `.blog_rotatr{display: none; justify-content: center; position: relative;}.blog_rotatr .anim_circle svg polygon{ animation: anim1 1s ease infinite !important; }`;
  document.body.appendChild(loaderStyle);

  var clonedSvg = document.querySelector(eleToCopy).cloneNode(true);
  svgWraper.appendChild(clonedSvg);
  eleWraper.appendChild(svgWraper);
  document.querySelector(eleToAppend).appendChild(eleWraper);
}
// show boompop loader
function showBomompopLoader(){
  document.querySelector('.blog_rotatr').style.display='flex';
}
// remove boompop loader
function hideBomompopLoader(){
   document.querySelector('.blog_rotatr').style.display='none';
}
// init updateBlogCategoriesLinks() on include
updateBlogCategoriesLinks();
