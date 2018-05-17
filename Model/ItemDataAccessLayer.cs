using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Angular2DemoProject.Model
{
    public class ItemDataAccessLayer
    {
        string connectionString = "Data Source = .; Initial Catalog = demo; integrated security=true;";


        // Get All Items
        public IEnumerable<Items> GetAllItems()
        {
            try
            {
                List<Items> lstItems = new List<Items>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("select * from tbldemo", con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        Items itemObject = new Items();
                        itemObject.id = Convert.ToInt32(rdr["id"]);
                        itemObject.address = rdr["address"].ToString();
                        itemObject.price = Convert.ToInt32(rdr["price"]);
                        itemObject.fileName = rdr["fileName"].ToString();
                        itemObject.imageFile = rdr["imageFile"].ToString();
                        lstItems.Add(itemObject);
                    }
                    con.Close();
                }
                return lstItems;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular item
        public Items GetItemById(int id)
        {
            try
            {
                Items items = new Items();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    string sqlQuery = "SELECT * FROM tbldemo WHERE id= " + id;
                    SqlCommand cmd = new SqlCommand(sqlQuery, con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        items.id = Convert.ToInt32(rdr["id"]);
                        items.address = rdr["address"].ToString();
                        items.price = Convert.ToInt32(rdr["price"]);
                        items.fileName = rdr["fileName"].ToString();
                        items.imageFile = rdr["imageFile"].ToString();
                    }
                }
                return items;
            }
            catch
            {
                throw;
            }
        }

        //To Add new item 
        public int AddItems(Items items)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    string query = string.Format("insert into tbldemo (address, price, fileName, imageFile) values ('{0}',{1},'{2}','{3}')", items.address, items.price, items.fileName, items.imageFile);
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        //To Delete the record on a particular item
        public int DeleteItem(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    string sqlQuery = "delete from tbldemo where id = " + id;
                    SqlCommand cmd = new SqlCommand(sqlQuery, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }


        //To Update the records of a particluar employee
        public int UpdateItem(Items items)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    string query = string.Format("update tbldemo set address='{0}', price={1}, fileName='{2}', imageFile='{3}' where id = {4}", items.address, items.price, items.fileName, items.imageFile, items.id);
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }

    public class Items
    {
        public int id { get; set; }
        public string address { get; set; }
        public int price { get; set; }
        public string fileName { get; set; }
        public string imageFile { get; set; }
    }
}
