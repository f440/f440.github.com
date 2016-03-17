def class_name(item)
  File.basename(item.identifier).sub(/\..*$/, '').sub(/^(\d+)$/, "x\\1")
end
