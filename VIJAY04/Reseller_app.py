from pytezos import pytezos
from kivy.app import App
from kivy.core.window import Window
from kivy.uix.screenmanager import ScreenManager,Screen
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.gridlayout import GridLayout
from kivy.uix.scrollview import ScrollView
from kivy.uix.popup import Popup
import mysql.connector
import datetime
ticket_addr=None
history_addr=None
myDb=None
owner_account="tz1LbvVGwdLgvUkrYHZoPbpYq77Z3dEufSsb"
def make_transaction(sender_public_key,sender_private_key,amount):
    tezos = pytezos.using(key=sender_private_key, shell="https://ghostnet.tezos.marigold.dev")
    operation = tezos.transaction(
        amount=int(amount*1000000),
        destination=owner_account,
        source=sender_public_key
    )
    transaction=operation_result = operation.autofill().sign().inject(_async=False)
    return transaction["hash"]
def refresh_addr_layouts():
    ticket_addr.refresh()
    history_addr.refresh()
def refresh_connection():
    global myDb
    myDb=mysql.connector.connect(host=localhost,user=user_name,password=password,database=database,auth_plugin="mysql_native_password")
localhost="localhost"
user_name=""
password=""
database="tezos"
just_started=1
class Login(BoxLayout):
    def submitted(self,):
        global user_name,password
        user_name=self.ids["user_name"].text
        password=self.ids["password"].text
        try:
            refresh_connection()
            self.parent.manager.current="Home"
            self.ids["user_name"].text=""
            self.ids["password"].text=""
            global just_started
            just_started+=1
            refresh_addr_layouts()
        except:
            button=CustomColorButton(text="Retry!")
            label=Label(text="Wrong Credential or Connection Error",font_size=30)
            layout=BoxLayout(orientation="vertical")
            layout.add_widget(label)
            layout.add_widget(button)
            popup=CustomPopUp(title="Failed to connect",auto_dismiss=False,content=layout,size_hint=(.4,.4))
            button.bind(on_press=popup.dismiss)
            popup.open()
            self.ids["user_name"].text=""
            self.ids["password"].text=""
class Tickets(ScrollView):
    def __init__(self,**kwargs):
        super().__init__(**kwargs)
        self.refresh()
    def refresh(self,):
        self.clear_widgets()
        global ticket_addr
        ticket_addr=self
        global just_started
        if(just_started==1):
            pass
        else:
            refresh_connection()
            mycursor=myDb.cursor(buffered=True)
            mycursor.execute("SELECT * FROM data;")
            self.data=mycursor.fetchall()
            self.grid=GridLayout(cols=2,spacing=20)
            self.grid.padding=[0,0,20,0]
            self.grid.size_hint_y=None
            self.size_hint=(1,1)
            self.grid.bind(minimum_height=self.grid.setter('height'))
            self.instances=[]
            for instance in self.data:
                if instance[5]==0:
                    ticket_id=str(instance[0])
                    buy_addr=CustomButton(text="Buy",size_hint=(.3,1))
                    widget_addr=RoundedLabelExtra(text=f"ticket_id:{instance[0]}\ncreated_date:{instance[1]}\nprice:{instance[2]} XTZ",size_hint_y=None,height=200,color=(1,1,1,1))
                    hash=str(instance[4])
                    self.grid.add_widget(widget_addr)
                    self.grid.add_widget(buy_addr)
                    self.instances.append([ticket_id,buy_addr,hash,widget_addr,instance[2]])
            self.add_widget(self.grid)
            for instance in self.instances:
                instance[1].bind(on_press=lambda x:self.buy_warning(x))
    def check_availability(self,ticket_id):
        refresh_addr_layouts()
        available_tickets=[]
        for instance in self.data:
            if(instance[5]==0):
                available_tickets.append(instance[0])
        if(int(ticket_id) in available_tickets):
            return 1
        else:
            return 0
    def buy_warning(self,instance):
        ticket_id=None
        ticket_price=0
        for obj in self.instances:
            if(obj[1]==instance):
                ticket_id=obj[0]
                ticket_price=obj[4]
                break
        if(self.check_availability(ticket_id)):
            button=CustomColorButton(text="ok")
            layout=Get_Key(ticket_id=ticket_id,price=ticket_price)
            popup=CustomPopUp(title="Make Transaction",auto_dismiss=True,content=layout,size_hint=(.8,.5))
            button.bind(on_press=popup.dismiss)
            popup.open()
        else:
            self.display_unavailabe()
    def display_unavailabe(self,):
        button=CustomColorButton(text="ok")
        label=Label(text="No Tickets Found",font_size=30)
        layout=BoxLayout(orientation="vertical")
        layout.add_widget(label)
        layout.add_widget(button)
        popup=CustomPopUp(title="Ticket unavailable",auto_dismiss=False,content=layout,size_hint=(.4,.4))
        button.bind(on_press=popup.dismiss)
        popup.open()
        refresh_addr_layouts()
class Get_Key(BoxLayout):
    def __init__(self,ticket_id,price,**kwargs):
        super().__init__(**kwargs)
        self.ticket_id=ticket_id
        self.price=price
    def submitted(self,):
        if(self.ids["public_key"].text=="" or self.ids["secret_key"].text==""):
            button=CustomColorButton(text="OK!")
            label=Label(text="Public/Secret key cant be Null",font_size=30)
            layout=BoxLayout(orientation="vertical")
            layout.add_widget(label)
            layout.add_widget(button)
            popup=CustomPopUp(title="Input Error",auto_dismiss=False,content=layout,size_hint=(.4,.4))
            button.bind(on_press=popup.dismiss)
            popup.open()
            refresh_addr_layouts()
        else:
            ticket_addr.refresh()
            hash=None
            if(ticket_addr.check_availability(self.ticket_id)):
                try:
                    public_key=self.ids["public_key"].text
                    secret_key=self.ids["secret_key"].text
                    self.ids["public_key"].text=""
                    self.ids["secret_key"].text=""
                    hash=make_transaction(public_key,secret_key,float(self.price))
                except:
                    button=CustomColorButton(text="OK!")
                    label=Label(text="Transaction Failed",font_size=30)
                    layout=BoxLayout(orientation="vertical")
                    layout.add_widget(label)
                    layout.add_widget(button)
                    popup=CustomPopUp(title="Failed",auto_dismiss=False,content=layout,size_hint=(.4,.4))
                    button.bind(on_press=popup.dismiss)
                    popup.open()
                finally:
                    if(hash!=None):
                        refresh_connection()
                        mycursor=myDb.cursor(buffered=True)
                        date=datetime.datetime.now().date().strftime('%Y-%m-%d')
                        mycursor.execute(f"UPDATE data SET sold_to='{user_name}',is_sold=1,sold_date='{date}',transaction_hash='{hash}' where ticket_id={self.ticket_id};")
                        mycursor.execute("commit;")
                    else:
                        button=CustomColorButton(text="OK!")
                        label=Label(text="Transaction Failed",font_size=30)
                        layout=BoxLayout(orientation="vertical")
                        layout.add_widget(label)
                        layout.add_widget(button)
                        popup=CustomPopUp(title="Failed",auto_dismiss=False,content=layout,size_hint=(.4,.4))
                        button.bind(on_press=popup.dismiss)
                        popup.open()
                    refresh_addr_layouts()
            else:
                ticket_addr.display_unavailabe()
            refresh_addr_layouts()
class History(ScrollView):
    def __init__(self,**kwargs):
        super().__init__(**kwargs)
        global history_addr
        history_addr=self
        self.refresh()
    def refresh(self,):
        global just_started
        if(just_started!=1):
            self.clear_widgets()
            refresh_connection()
            mycursor=myDb.cursor(buffered=True)
            mycursor.execute("SELECT * from data order by sold_date DESC,ticket_id;")
            data=mycursor.fetchall()
            Transactions=[]
            for transaction in data:
                if(transaction[5]==1 and transaction[3]==user_name):
                    Transactions.append(transaction)
            self.grid=GridLayout(cols=1,spacing=20)
            self.grid.size_hint_y=None
            self.size_hint=(1,1)
            self.grid.bind(minimum_height=self.grid.setter('height'))
            for i in Transactions:
                self.grid.add_widget(RoundedLabel(text=f"Ticket_id:{i[0]}\nPrice:{i[2]}\nSoldTo:{i[3]}\nSold On:{i[6]}\n \nTicket_Hash:    {i[4][0:32]}\n{i[4][32:63]}\n \nTransaction_hash:    {i[7][0:23]}\n{i[7][23:50]}",size_hint_y=None,height=600,color=(1,1,1,1)))
            self.add_widget(self.grid)
        else:
            pass
class Home(BoxLayout):
    def refresh_all_layouts(self,):
        refresh_addr_layouts()
class Screens(ScreenManager):
    pass
class LoginPage(Screen):
    pass
class HomePage(Screen):
    pass
class CustomButton(Button):
    pass
class RoundedLabelExtra(Label):
    pass
class RoundedLabel(Label):
    pass
class CustomColorButton(Button):
    pass
class CustomPopUp(Popup):
    pass
class Reseller_app(App):
    def build(self,):
        self.title="Reseller App"
        Window.clearcolor=(1,1,1,1)
        pass
if __name__=='__main__':
    Reseller_app().run()
