from flask import Flask, jsonify, request
from flasgger import Swagger
import psycopg2
#from flask_cors import CORS
from datetime import datetime
#from app.customers import list_customer
from customers import list_customer
#from app.products import list_products
from products import list_products
from flask_cors import CORS, cross_origin
app = Flask(__name__)
# cors = CORS(app, resources={r"/*": {"origins": "https://sunarms.co.in"}})  # Allow specific origin
#from flask import make_response
CORS(app)
swagger = Swagger(app)

DUMMY_VALUES = {
    'firm_name': 'SunarMS Jeweler',
    'description': 'Please update your profile information.',
    'gst': 'ABC123XYZ',
    'address': 'Jaipur , Rajasthan',
}

# Database configuration
DB_HOST = 'localhost'
DB_NAME = 'invoice'
DB_USER = 'vikas'
DB_PASSWORD = 'vikas'

import logging

logging.basicConfig(level=logging.DEBUG, filename='api.log', filemode='w',
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger()

# Establish a connection to the PostgreSQL database
def connect_to_db():
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    return conn


@app.route('/list_customers', methods=['GET'])
def get_customers():
    """
    Get all customers
    ---
    parameters:
      - name: jeweller_id
        in: query
        type: string
        required: true
        description: The ID of the jeweller
    responses:
      200:
        description: Returns all customers for the specified jeweller
    """
    # Get the jeweller_id from the request
    jeweller_id = request.args.get('jeweller_id')

    if not jeweller_id:
        return jsonify({'message': 'Jeweller ID is required'}), 400

    conn = connect_to_db()
    cursor = conn.cursor()

    data = list_customer(cursor=cursor,jeweller_id=jeweller_id,logger=logger)
    cursor.close()
    conn.close()

    return data

# Route to create a new customer in the database
@app.route('/create_customers', methods=['POST'])
def create_customer():
    """
    Create a new customer
    ---
    parameters:
      - name: body
        in: body
        required: false
        schema:
          id: Customer
          properties:
            mail_address_line_1:
              type: string
              description: Mailing address line 1
            mail_address_line_2:
              type: string
              description: Mailing address line 2
            mail_city:
              type: string
              description: City for mailing address
            first_name:
              type: string
              description: First name of the customer
            last_name:
              type: string
              description: Last name of the customer
            phone_1:
              type: string
              description: Primary phone number
            phone_2:
              type: string
              description: Secondary phone number
            email:
              type: string
              description: Email address
            customer_type:
              type: string
              description: Type of customer
            jeweller_id:
              type: string
              description: ID of the jeweler
    responses:
      201:
        description: Customer created successfully
    """
    new_customer_data = request.get_json()

    conn = connect_to_db()
    cursor = conn.cursor()

    # Construct the INSERT query dynamically based on provided fields
    columns = ', '.join(new_customer_data.keys())
    placeholders = ', '.join(['%s'] * len(new_customer_data))
    query = f"INSERT INTO customers ({columns}) VALUES ({placeholders})"

    cursor.execute(query, tuple(new_customer_data.values()))
    conn.commit()
    logger.debug(f'create_customer:: insert query {query}')
    cursor.close()
    conn.close()

    return 'Customer created successfully', 201

@app.route('/list_products', methods=['GET'])
def list_products():
    """
        Get all products
        ---
        parameters:
          - name: jeweller_id
            in: query
            type: string
            required: true
            description: The ID of the jeweller
        responses:
          200:
            description: Returns all products for the specified jeweller
        """
    try:
        conn = connect_to_db()
        cursor = conn.cursor()
        jeweller_id = request.args.get('jeweller_id')
        data = list_products(cursor=cursor,jeweller_id=jeweller_id, logger=logger)

        cursor.close()
        conn.close()

        return data, 200
    except Exception as e:
        logger.debug(f'list_products:: error: {e}')
        return jsonify({'error': str(e)}), 500

@app.route('/create_product', methods=['POST'])
def create_product():
    """
    Create a new product
    ---
    parameters:
      - name: body
        in: body
        required: false
        schema:
          id: Product
          properties:
            product_code:
              type: string
              description: Product code
            barcode:
              type: string
              description: Barcode of the product
            product_name:
              type: string
              description: Name of the product
            product_description:
              type: string
              description: Description of the product
            product_category:
              type: string
              description: Category of the product
            product_quantity:
              type: integer
              description: Quantity of the product
            product_weight:
              type: float
              description: Weight of the product
            hsn_number:
              type: string
              description: HSN (Harmonized System of Nomenclature) number of the product
            jeweller_id:
              type: string
              description: ID of the jeweler
    responses:
      201:
        description: Product created successfully
    """

    try:
        conn = connect_to_db()
        new_product_data = request.get_json()
        cursor = conn.cursor()

        # Construct the INSERT query dynamically based on provided fields
        columns = ', '.join(new_product_data.keys())
        placeholders = ', '.join(['%s'] * len(new_product_data))
        query = f"INSERT INTO products ({columns}) VALUES ({placeholders})"

        cursor.execute(query, tuple(new_product_data.values()))
        conn.commit()

        cursor.close()
        conn.close()

        print("Product inserted successfully.")

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route("/get_profile_by_id", methods=["GET"])
def get_profile_by_id():
    """
            Get profile
            ---
            parameters:
              - name: jeweller_id
                in: query
                type: string
                required: true
                description: The ID of the jeweller
            responses:
              200:
                description: Returns all products for the specified jeweller
            """
    """Fetches profile details based on the provided jeweller_id.
    if not available create one with dummy value"""
    try:
        conn = connect_to_db()
        cursor = conn.cursor()
        jeweller_id = request.args.get('jeweller_id')
        # Prepare SQL query with parameter for jeweller_id
        query = "SELECT * FROM profile WHERE jeweller_id = %s"
        cursor.execute(query, (jeweller_id,))

        # Fetch the profile data (if any)
        profile_data = cursor.fetchone()
        logger.debug(f"get_profile_by_id :: profile_data is {profile_data}")
        conn.close()
        profiles= []
        if profile_data:
            # Convert fetched data to dictionary and return JSON response
            return jsonify([dict(zip([col.name for col in cursor.description], profile_data))])

            #response = make_response(jsonify([dict(zip([col.name for col in cursor.description], profile_data))]))
            #response.headers['Access-Control-Allow-Origin'] = 'https://sunarms.co.in'  # Specify allowed origin
            #return response
        else:
            # Return a 404 Not Found response if no profile found
            logger.debug('get_profile_by_id:: profile not found')

            return create_profile(DUMMY_VALUES, jeweller_id)
            #jsonify({"data":[],"error": "Profile not found for jeweller_id: {}".format(jeweller_id)})

    except (Exception) as error:
        # Handle database connection errors or other exceptions
        logger.debug("get_profile_by_id :: Error while fetching profile:", error)
        return jsonify({"error": "Internal server error"}), 500

def create_profile(data, jeweller_id):
    """
    Create a new jeweler profile with provided data

    This function is used within the `get_profile_by_id` endpoint to create a new
    profile with dummy values if no existing profile is found.

    Args:
        data (dict): A dictionary containing profile data fields and values.
        jeweller_id (str): The ID of the jeweller for the new profile.

    Returns:
        JSON: A JSON response containing the newly created profile data or an error message.
    """

    try:
        conn = connect_to_db()
        cursor = conn.cursor()

        # Prepare INSERT query
        query = """
        INSERT INTO profile (jeweller_id, firm_name, description)
        VALUES (%s, %s, %s)
        RETURNING jeweller_id;  -- Return the newly created profile ID
        """

        cursor.execute(query, (jeweller_id, data['firm_name'], data['description']))
        conn.commit()

        # Fetch the newly created profile ID
        profile_id = cursor.fetchone()[0]

        cursor.execute("SELECT * FROM profile WHERE jeweller_id = %s", (profile_id,))
        created_profile = cursor.fetchone()

        conn.close()

        return jsonify(dict(zip([col.name for col in cursor.description], created_profile)))

    except (Exception) as error:
        print("Error while creating profile:", error)
        return jsonify({"error": "Internal server error"}), 500

@app.route('/save_invoice', methods=['POST'])
def save_invoice_data():
    try:
        # Get the data from the request JSON
        new_invoice_data = request.get_json()
        print(new_invoice_data)
        # Extract relevant data
        products = new_invoice_data.get('products', [])
        bill_number = new_invoice_data.get('bill_number', '')
        customer_name = new_invoice_data.get('customerName', '')
        phone = new_invoice_data.get('phone', '')
        address = new_invoice_data.get('address', '')
        customer = new_invoice_data.get('customer', '')
        jeweller_id = new_invoice_data.get('jeweller_id', '')
        bill_total = new_invoice_data.get('grandTotal', '')
        discount = new_invoice_data.get('discount', '')
        gst = new_invoice_data.get('gst', '')
        payment_mode = new_invoice_data.get('paymentMode', '')
        payment_status = new_invoice_data.get('paymentStatus', '')
        payment_due = new_invoice_data.get('paymentPending', 0)
        bill_type = new_invoice_data.get('billType', '')

        # Get current date
        current_date = datetime.now().strftime('%Y-%m-%d')

        # Connect to the database
        conn = connect_to_db()
        cursor = conn.cursor()

        # Insert data into invoices table
        cursor.execute("""
            INSERT INTO invoices (bill_number, bill_date, customer_name, phone, address, customer, jeweller_id, bill_amount, discount, gst,
            payment_mode, payment_status, payment_due, bill_type)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (bill_number, current_date, customer_name, phone, address, customer, jeweller_id,bill_total, discount,gst, payment_mode,
              payment_status, payment_due, bill_type))
        invoice_id = cursor.fetchone()[0]
        print(invoice_id)
        print("success")

        # Insert product data into products table
        for product in products:
            print(product)
            product_values = (
                jeweller_id,
                invoice_id,
                bill_number,
                product.get('productName', {}).get('value', ''),
                product.get('hsnCode', {}).get('value', ''),
                product.get('totalWeight', {}).get('value', ''),
                product.get('netWeight', {}).get('value', ''),
                product.get('perGramRate', {}).get('value', ''),
                product.get('purity', {}).get('value', ''),
                product.get('productCost', {}).get('value', ''),
                product.get('makingCharge', {}).get('value', ''),
                product.get('totalCost', {}).get('value', '')
            )
            print(product_values)
            cursor.execute("""
                INSERT INTO invoice_products (jeweller_id,invoice_id,bill_number, product_name, hsn_code, total_weight, net_weight, per_gram_rate, purity, product_cost, making_charge, total_cost)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, product_values)
            print("susse")

        # Commit the transaction and close the connection
        conn.commit()
        conn.close()

        return jsonify({'message': 'Invoice data saved successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/list-invoices', methods=['GET'])
def list_invoices():
    try:
        # Get jeweller_id from query parameter
        jeweller_id = request.args.get('jeweller_id')
        if not jeweller_id:
            return jsonify({'error': 'Missing jeweller_id parameter'}), 400

        # Connect to the database
        conn = connect_to_db()
        cursor = conn.cursor()

        # Query invoices for the jeweller
        cursor.execute("""
            SELECT * FROM invoices WHERE jeweller_id = %s order by created_at desc Limit 10; 
        """, (jeweller_id,))

        invoices = cursor.fetchall()

        # Fetch column names
        column_names = [desc[0] for desc in cursor.description]

        # Create a list of dictionaries where each dictionary represents a customer
        invoice_list = []
        for invoice in invoices:
            customer_dict = dict(zip(column_names, invoice))
            invoice_list.append(customer_dict)

        # Return the list of invoices
        return jsonify(invoice_list)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/list-invoice-by-customer', methods=['GET'])
def list_invoice_by_customer():
    try:
        # Get jeweller_id and customer_id from query parameters
        jeweller_id = request.args.get('jeweller_id')
        customer_id = request.args.get('customer_id')
        print(f'list_invoice_by_customer{request.args}' )
        if not jeweller_id:
            return jsonify({'error': 'Missing jeweller_id parameter'}), 400
        if not customer_id:
            return jsonify({'error': 'Missing customer_id parameter'}), 400

        # Connect to the database
        conn = connect_to_db()
        cursor = conn.cursor()

        # Query invoices for the specified customer under the jeweller
        cursor.execute("""
            SELECT * FROM invoices WHERE jeweller_id = %s AND customer_name = %s;
        """, (jeweller_id, customer_id))

        invoices = cursor.fetchall()
        print(invoices)
        # Fetch column names
        column_names = [desc[0] for desc in cursor.description]

        # Create a list of dictionaries where each dictionary represents an invoice
        invoice_list = []
        for invoice in invoices:
            invoice_dict = dict(zip(column_names, invoice))
            invoice_list.append(invoice_dict)

        print(jsonify(invoice_list))
        # Return the list of invoices
        return jsonify(invoice_list)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/update_profile', methods=['PUT'])
def update_profile():
    conn = connect_to_db()
    cur = conn.cursor()

    try:
        new_data = request.json
        print(new_data)
        # Construct SQL query to update data
        sql_query = f"""
                UPDATE profile 
                SET description = '{new_data['description']}', 
                    gst = '{new_data.get('gst')}', 
                    address = '{new_data.get('address')}', 
                    logo_url = '{new_data.get('logo_url')}', 
                    mobile_number = '{new_data.get('mobile_number')}', 
                    email = '{new_data.get('email')}', 
                    city = '{new_data.get('city')}', 
                   gst_percentage = '{new_data.get('gst_percentage')}', 
                    owner = '{new_data.get('owner')}',
                    firm_name = '{new_data.get('firm_name')}',
                    pan = '{new_data.get('pan')}',
                    invoice_tnc = '{new_data.get('invoice_tnc')}'
                WHERE jeweller_id  = '{new_data.get('jeweller_id')}';
            """
        print(sql_query)
        # Execute SQL query
        cur.execute(sql_query)
        logger.debug(f'update_profile:: profile query {sql_query}')
        conn.commit()
        #print(new_data)
        return jsonify({'message': f'Profile for {new_data["firm_name"]} updated successfully'})
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()


@app.route('/sales_agg_view', methods=['GET'])
def sales_agg_view():
    """
        Get all sales_agg_view
        ---
        parameters:
          - name: jeweller_id
            in: query
            type: string
            required: true
            description: The ID of the jeweller
        responses:
          200:
          description: Returns all sales data

    """
    try:
        # Get jeweller_id from query parameter
        jeweller_id = request.args.get('jeweller_id')
        if not jeweller_id:
            return jsonify({'error': 'Missing jeweller_id parameter'}), 400

        # Connect to the database
        conn = connect_to_db()
        cursor = conn.cursor()

        # Query invoices for the jeweller
        cursor.execute("""
            with today_sales as (
            select coalesce(sum(bill_amount::float),0) as today_sell, coalesce(sum(payment_due::float),0) as today_due, 
            coalesce(sum( case when payment_mode in ('UPI','CARD') then bill_amount::float END),0) as bank_payment_today
            from invoices i 
            where bill_date = current_date 
            and jeweller_id = %s
            ),
            current_month_sales as(
            select coalesce(sum(bill_amount::float),0 ) as month_sell, coalesce(sum(payment_due::float),0) as month_due
            from invoices i 
            where EXTRACT(MONTH FROM bill_date) = EXTRACT(MONTH FROM current_date)
            and jeweller_id = %s
            )
            select today_sell, today_due , month_sell, month_due, 
            (today_sell-today_due-bank_payment_today) AS cash_payment_today, bank_payment_today
            from today_sales ,current_month_sales;
            """,
            (jeweller_id,jeweller_id))

        agg_data = cursor.fetchone()
        logger.debug(f"agg_data :: sales data is {agg_data}")
        print([dict(zip([col.name for col in cursor.description], agg_data))])
        return jsonify([dict(zip([col.name for col in cursor.description], agg_data))])


    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/daily_sales', methods=['GET'])
def daily_sales():
    try:
        # Get jeweller_id from query parameter
        jeweller_id = request.args.get('jeweller_id')
        if not jeweller_id:
            return jsonify({'error': 'Missing jeweller_id parameter'}), 400

        # Connect to the database
        conn = connect_to_db()
        cursor = conn.cursor()

        # Query invoices for the jeweller
        cursor.execute("""
            select bill_date::DATE , SUM(bill_amount::FLOAT) as SALES
            from invoices i 
            where 1=1 and bill_date >= current_date -30
            and jeweller_id = %s
            group by 1
            order by 1 asc; 
        """, (jeweller_id,))

        sales_bill = cursor.fetchall()

        # Fetch column names
        column_names = [desc[0] for desc in cursor.description]

        # Create a list of dictionaries where each dictionary represents a customer
        sales_list = []
        for sales in sales_bill:
            sales_dict = dict(zip(column_names, sales))
            sales_list.append(sales_dict)
        logger.debug(f"daily_sales {jeweller_id} :: sales data is {sales_list}")
        # Return the list of invoices
        return jsonify(sales_list)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/monthly_sales', methods=['GET'])
def monthly_sales():
    try:
        # Get jeweller_id from query parameter
        jeweller_id = request.args.get('jeweller_id')
        if not jeweller_id:
            return jsonify({'error': 'Missing jeweller_id parameter'}), 400

        # Connect to the database
        conn = connect_to_db()
        cursor = conn.cursor()

        # Query invoices for the jeweller
        cursor.execute("""
            select  EXTRACT(month FROM bill_date) as month , SUM(bill_amount::FLOAT) as SALES
            from invoices i 
            where 1=1 and EXTRACT(year FROM bill_date) = EXTRACT(year FROM current_date)
            and jeweller_id = %s
            group by 1
            order by 1 asc; 
            """, (jeweller_id,))

        sales_bill = cursor.fetchall()

        # Fetch column names
        column_names = [desc[0] for desc in cursor.description]

        # Create a list of dictionaries where each dictionary represents a customer
        sales_list = []
        for sales in sales_bill:
            sales_dict = dict(zip(column_names, sales))
            sales_list.append(sales_dict)

        # Return the list of invoices
        return jsonify(sales_list)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
    #run_simple('localhost', 5000, app, use_reloader=True, use_debugger=True, ssl_context='adhoc')
