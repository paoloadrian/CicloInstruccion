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

ActiveRecord::Schema.define(version: 20150429013929) do

  create_table "binary_cycles", force: true do |t|
    t.string   "pc"
    t.string   "actual_instruction"
    t.integer  "step"
    t.boolean  "execution_cycle"
    t.integer  "total_instructions"
    t.integer  "executed_instructions"
    t.integer  "ram_binary_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "binary_cycles", ["ram_binary_id"], name: "index_binary_cycles_on_ram_binary_id"

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

  create_table "hexa_cpus", force: true do |t|
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

  create_table "hexa_cycles", force: true do |t|
    t.string   "pc"
    t.string   "actual_instruction"
    t.integer  "step"
    t.boolean  "execution_cycle"
    t.integer  "total_instructions"
    t.integer  "executed_instructions"
    t.integer  "hexa_ram_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "hexa_cycles", ["hexa_ram_id"], name: "index_hexa_cycles_on_hexa_ram_id"

  create_table "hexa_ram_cells", force: true do |t|
    t.integer  "hexa_ram_id"
    t.string   "direction"
    t.string   "content"
    t.integer  "position"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "hexa_ram_cells", ["hexa_ram_id"], name: "index_hexa_ram_cells_on_hexa_ram_id"

  create_table "hexa_rams", force: true do |t|
    t.integer  "hexa_cpu_id"
    t.integer  "instructions"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "hexa_rams", ["hexa_cpu_id"], name: "index_hexa_rams_on_hexa_cpu_id"

  create_table "ram_binaries", force: true do |t|
    t.integer  "cpu_binary_id"
    t.integer  "instructions"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ram_binaries", ["cpu_binary_id"], name: "index_ram_binaries_on_cpu_binary_id"

  create_table "ram_binary_cells", force: true do |t|
    t.string   "content"
    t.string   "direction"
    t.integer  "position"
    t.integer  "ram_binary_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ram_binary_cells", ["ram_binary_id"], name: "index_ram_binary_cells_on_ram_binary_id"

end
