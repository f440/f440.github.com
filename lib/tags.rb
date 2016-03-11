def tags(items)
  items.map{ |i| i[:tags] }.flatten.compact.uniq.sort
end

def create_tag_pages(items)
  tags(items).each do |tag|
    items.create(
      "",
      { title: tag },
      "/blog/categories/#{tag}.html"
    )
  end
end
