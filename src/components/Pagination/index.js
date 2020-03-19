import React from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';

function Pagination({ className, page = 5, pageCount = 10, onChangePage }) {
  let showCount = 0;
  let pageNodes = [];
  pageNodes.push(
    <div className={classnames($style.page, page == 1 ? $style.page_active : '')} key={1} onClick={() => onChangePage(1)}>
      1
    </div>
  );
  if (page - 2 > 2) {
    pageNodes.push(
      <div className={$style.page} key={'prev-dots'}>
        ...
      </div>
    );
  }
  if (page - 2 > 1) {
    pageNodes.push(
      <div className={$style.page} onClick={() => onChangePage(page - 2)} key={page - 2}>
        {page - 2}
      </div>
    );
    showCount++;
  }
  if (page - 1 > 1) {
    pageNodes.push(
      <div className={$style.page} onClick={() => onChangePage(page - 1)} key={page - 1}>
        {page - 1}
      </div>
    );
    showCount++;
  }
  if (page > 1 && page <= pageCount) {
    pageNodes.push(
      <div className={classnames($style.page, $style.page_active)} onClick={() => onChangePage(page)} key={page}>
        {page}
      </div>
    );
    showCount++;
  }
  let curPage = page + 1;
  while (showCount < 5 && curPage <= pageCount) {
    if (curPage <= pageCount) {
      pageNodes.push(
        <div className={$style.page} onClick={(page => () => onChangePage(page))(curPage)} key={curPage}>
          {curPage}
        </div>
      );
      curPage++;
      showCount++;
      continue;
    }
  }
  if (curPage < pageCount) {
    pageNodes.push(
      <div className={$style.page} key={'next-dots'}>
        ...
      </div>
    );
  }

  return (
    <div className={classnames(className, $style.pagination)}>
      <div className={$style.content}>
        <div className={$style.prev}>
          <div className={$style.prev__arrow}></div>
          上一页
        </div>
        {pageNodes}
        <div className={$style.next}>
          下一页
          <div className={$style.next__arrow}></div>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
