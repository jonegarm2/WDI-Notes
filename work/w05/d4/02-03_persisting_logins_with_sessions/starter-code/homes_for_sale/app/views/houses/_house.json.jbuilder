json.extract! house, :id, :address, :bedrooms, :baths, :price, :created_at, :updated_at
json.url house_url(house, format: :json)
