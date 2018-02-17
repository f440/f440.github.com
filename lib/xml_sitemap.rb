# Original: https://raw.githubusercontent.com/nanoc/nanoc/master/lib/nanoc/helpers/xml_sitemap.rb

# Copyright (c) 2007-2016 Denis Defreyne and contributors

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

module Nanoc::Helpers
  # @see http://nanoc.ws/doc/reference/helpers/#xmlsitemap
  module XMLSitemap
    # @option params [Array] :items
    # @option params [Proc] :rep_select
    #
    # @return [String]
    def xml_sitemap(params = {})
      require 'builder'

      # Extract parameters
      items       = params.fetch(:items) { @items.reject { |i| i[:is_hidden] } }
      select_proc = params.fetch(:rep_select, nil)

      # Create builder
      buffer = +''
      xml = Builder::XmlMarkup.new(target: buffer, indent: 2)

      # Check for required attributes
      if @config[:base_url].nil?
        raise 'The Nanoc::Helpers::XMLSitemap helper requires the site configuration to specify the base URL for the site.'
      end

      # Build sitemap
      xml.instruct!
      xml.urlset(xmlns: 'https://www.sitemaps.org/schemas/sitemap/0.9') do
        # Add item
        items.sort_by(&:identifier).each do |item|
          reps = item.reps.select(&:path)
          reps.select! { |r| select_proc[r] } if select_proc
          reps.sort_by { |r| r.name.to_s }.each do |rep|
            xml.url do
              xml.loc Addressable::URI.escape(@config[:base_url] + rep.path)
              case
              when item[:updated_at]
                xml.lastmod item[:updated_at].strftime('%Y-%m-%dT%H:%M:%SZ')
              when item[:created_at]
                xml.lastmod item[:created_at].strftime('%Y-%m-%dT%H:%M:%SZ')
              when item[:mtime]
                xml.lastmod item[:mtime].__nanoc_to_iso8601_time
              end
              xml.changefreq item[:changefreq] unless item[:changefreq].nil?
              xml.priority item[:priority] unless item[:priority].nil?
            end
          end
        end
      end

      # Return sitemap
      buffer
    end
  end
end
