def tags(items)
  items.map{ |i| i[:tags] }.flatten.compact.uniq.sort
end

def create_tag_pages(items)
  tags(items).each do |tag|
    items.create(
      "",
      { tag: tag },
      "/blog/categories/#{tag}.erb",
      binary: false
    )
  end
end
