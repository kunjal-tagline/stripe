import { Component, OnInit } from '@angular/core';

const stripe = Stripe(
  'pk_test_51LZT3JSGY6Tx76e08FHoOE741sez30B9vThOmpMXccgflw4QAaiMpIrMAld4bJtzxkzpX2sN80Qu3MUAFwM3C5vl000L2A6WRx',
  { locale: '' }
);
const elements = stripe.elements();

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };
    // Create an instance of the card Element.
    var card = elements.create('card', { style: style });
    // Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element1');

    card.addEventListener('change', (event: any) => {
      let displayError = document.getElementById('card-errors') as HTMLElement;
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form') as HTMLElement;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      stripe.createToken(card).then((result: any) => {
        if (result.error) {
          // Inform the user if there was an error
          var errorElement = document.getElementById(
            'card-errors'
          ) as HTMLElement;
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server
          stripe.paymentRequest;
          //console.log('stripe.paymentRequest', stripe.paymentRequest)
        }
      });
    });
  }
}
