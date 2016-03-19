def create_paging(items)
  start_page = 2
  current_page = 0
  sorted_articles.each_slice(page_size) do |chunked_articles|
    current_page += 1
    next if current_page < start_page
    items.create(
      "",
      { page: current_page },
      "/page/#{current_page}.erb",
      binary: false
    )
  end
end

def next_page(current_page)
  current_page < max_page ? current_page + 1 : nil
end

def prev_page(current_page)
  current_page > 1 ? current_page - 1 : nil
end

def max_page
  sorted_articles.each_slice(page_size).count
end

def page_size
  @config[:page_size] || 5
end
