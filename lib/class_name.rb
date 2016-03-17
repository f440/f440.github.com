def class_name(item)
  File.basename(item.identifier).gsub(/\..*$/, '')
end
