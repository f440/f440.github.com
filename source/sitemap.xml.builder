xml.instruct!
xml.urlset "xmlns" => "http://www.sitemaps.org/schemas/sitemap/0.9" do
  sitemap.resources.each do |resource|
    next if resource.url =~ /((\/(CNAME|post|page|archives|categories|404.html))|(\.(css|js|eot|svg|woff|ttf|png|jpg|ico|xml)$))/o
    xml.url do
      xml.loc URI.join(data.site.url, resource.url)
      xml.lastmod DateTime.now.iso8601
    end
  end
end
