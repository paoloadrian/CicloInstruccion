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

ActiveRecord::Schema.define(version: 20150823055912) do

  create_table "assembler_cpus", force: true do |t|
    t.integer  "architecture"
    t.integer  "directions"
    t.string   "pc"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "assembler_cycles", force: true do |t|
    t.integer  "assembler_ram_id"
    t.string   "pc"
    t.string   "actual_instruction"
    t.integer  "step"
    t.boolean  "execution_cycle"
    t.integer  "total_instructions"
    t.integer  "executed_instructions"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "specific_registers_cpu_id"
    t.integer  "general_use_registers_cpu_id"
    t.boolean  "store"
    t.string   "register"
    t.string   "direction"
    t.text     "log"
    t.integer  "intents"
    t.integer  "fails"
  end

  add_index "assembler_cycles", ["assembler_ram_id"], name: "index_assembler_cycles_on_assembler_ram_id"
  add_index "assembler_cycles", ["general_use_registers_cpu_id"], name: "index_assembler_cycles_on_general_use_registers_cpu_id"
  add_index "assembler_cycles", ["specific_registers_cpu_id"], name: "index_assembler_cycles_on_specific_registers_cpu_id"

  create_table "assembler_exercises", force: true do |t|
    t.integer  "user_id"
    t.integer  "assembler_cpu_id"
    t.integer  "assembler_ram_id"
    t.integer  "assembler_cycle_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
  end

  add_index "assembler_exercises", ["assembler_cpu_id"], name: "index_assembler_exercises_on_assembler_cpu_id"
  add_index "assembler_exercises", ["assembler_cycle_id"], name: "index_assembler_exercises_on_assembler_cycle_id"
  add_index "assembler_exercises", ["assembler_ram_id"], name: "index_assembler_exercises_on_assembler_ram_id"
  add_index "assembler_exercises", ["user_id"], name: "index_assembler_exercises_on_user_id"

  create_table "assembler_ram_cells", force: true do |t|
    t.integer  "assembler_ram_id"
    t.string   "direction"
    t.string   "content"
    t.integer  "position"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "assembler_ram_cells", ["assembler_ram_id"], name: "index_assembler_ram_cells_on_assembler_ram_id"

  create_table "assembler_rams", force: true do |t|
    t.integer  "assembler_cpu_id"
    t.integer  "instructions"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "assembler_rams", ["assembler_cpu_id"], name: "index_assembler_rams_on_assembler_cpu_id"

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
    t.integer  "specific_registers_cpu_id"
    t.boolean  "store"
    t.string   "register"
    t.string   "direction"
    t.text     "log"
    t.integer  "intents"
    t.integer  "fails"
  end

  add_index "binary_cycles", ["ram_binary_id"], name: "index_binary_cycles_on_ram_binary_id"
  add_index "binary_cycles", ["specific_registers_cpu_id"], name: "index_binary_cycles_on_specific_registers_cpu_id"

  create_table "binary_exercises", force: true do |t|
    t.integer  "user_id"
    t.integer  "cpu_binary_id"
    t.integer  "ram_binary_id"
    t.integer  "binary_cycle_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
  end

  add_index "binary_exercises", ["binary_cycle_id"], name: "index_binary_exercises_on_binary_cycle_id"
  add_index "binary_exercises", ["cpu_binary_id"], name: "index_binary_exercises_on_cpu_binary_id"
  add_index "binary_exercises", ["ram_binary_id"], name: "index_binary_exercises_on_ram_binary_id"
  add_index "binary_exercises", ["user_id"], name: "index_binary_exercises_on_user_id"

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

  create_table "general_use_registers_cpus", force: true do |t|
    t.string   "pc"
    t.string   "ir"
    t.string   "mar"
    t.string   "mbr"
    t.string   "r1"
    t.string   "r2"
    t.string   "r3"
    t.string   "r4"
    t.string   "r5"
    t.string   "r6"
    t.string   "data_bus"
    t.string   "dir_bus"
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
    t.integer  "specific_registers_cpu_id"
    t.boolean  "store"
    t.string   "register"
    t.string   "direction"
    t.text     "log"
    t.integer  "intents"
    t.integer  "fails"
  end

  add_index "hexa_cycles", ["hexa_ram_id"], name: "index_hexa_cycles_on_hexa_ram_id"
  add_index "hexa_cycles", ["specific_registers_cpu_id"], name: "index_hexa_cycles_on_specific_registers_cpu_id"

  create_table "hexa_exercises", force: true do |t|
    t.integer  "user_id"
    t.integer  "hexa_cpu_id"
    t.integer  "hexa_ram_id"
    t.integer  "hexa_cycle_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
  end

  add_index "hexa_exercises", ["hexa_cpu_id"], name: "index_hexa_exercises_on_hexa_cpu_id"
  add_index "hexa_exercises", ["hexa_cycle_id"], name: "index_hexa_exercises_on_hexa_cycle_id"
  add_index "hexa_exercises", ["hexa_ram_id"], name: "index_hexa_exercises_on_hexa_ram_id"
  add_index "hexa_exercises", ["user_id"], name: "index_hexa_exercises_on_user_id"

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

  create_table "specific_registers_cpus", force: true do |t|
    t.string   "pc"
    t.string   "ir"
    t.string   "mar"
    t.string   "mbr"
    t.string   "ac"
    t.string   "dr"
    t.string   "data_bus"
    t.string   "dir_bus"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

end
