from flask import jsonify
import logging

logging.basicConfig(level=logging.DEBUG, filename='api.log', filemode='w',
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger()

def list_products(cursor,jeweller_id:str,logger):
    cursor.execute(f'''SELECT * FROM products where jeweller_id={jeweller_id};''')

    products = cursor.fetchall()
    logger.debug(f'list_customer:: len of the data {len(products)}')
    # Convert results to a list of dictionaries
    products_list = []
    for product in products:
        product_dict = {
            'product_id': product[0],
            'product_code': product[1],
            'barcode': product[2],
            'product_name': product[3],
            'product_description': product[4],
            'product_category': product[5],
            'product_quantity': product[6],
            'product_weight': product[7],
            'created_at': product[8],
            'updated_at': product[9],
            'hsn_number': product[10]
        }
        products_list.append(product_dict)

        return jsonify(products_list)