# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150319031604) do

  create_table "cpu_binaries", force: true do |t|
    t.integer  "co"
    t.integer  "dir"
    t.string   "pc"
    t.string   "load"
    t.string   "store"
    t.string   "add"
    t.string   "sub"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ram_binaries", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ram_binary_cells", force: true do |t|
    t.string   "content"
    t.string   "direction"
    t.integer  "ram_binary_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ram_binary_cells", ["ram_binary_id"], name: "index_ram_binary_cells_on_ram_binary_id"

end
