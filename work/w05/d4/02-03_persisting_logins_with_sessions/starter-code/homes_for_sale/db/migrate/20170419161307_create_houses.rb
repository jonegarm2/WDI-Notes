class CreateHouses < ActiveRecord::Migration[5.0]
  def change
    create_table :houses do |t|
      t.string :address
      t.integer :bedrooms
      t.float :baths
      t.integer :price

      t.timestamps
    end
  end
end
