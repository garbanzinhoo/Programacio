import java.awt.*;
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Calculadora extends JFrame {
    JTextField num1;  // Camp de text per introduir el primer número
    JLabel operacio;  // Espai per mostrar la operació
    JTextField num2;  // Camp de text per introduir el segon número
    JLabel resultat;  // Espai per mostrar el resultat

    public Calculadora() {
        // Panell de la finestra principal
        Container panell = getContentPane();

            // Panell superior (n1, operació, n2)
            JPanel nums = new JPanel();
            nums.setLayout(new FlowLayout(FlowLayout.CENTER));
                num1 = new JTextField();
                num1.setPreferredSize(new Dimension(100, 30));
                num1.setHorizontalAlignment(SwingConstants.RIGHT);

                operacio = new JLabel();
                operacio.setPreferredSize(new Dimension(40, 29));
                operacio.setHorizontalAlignment(SwingConstants.CENTER);
                operacio.setBorder(BorderFactory.createLineBorder(Color.black, 1));

                num2 = new JTextField();
                num2.setPreferredSize(new Dimension(100, 30));
                num2.setHorizontalAlignment(SwingConstants.RIGHT);
            nums.add(num1);
            nums.add(operacio);
            nums.add(num2);

            // Panell central (resultat)
            JPanel res = new JPanel();
                resultat = new JLabel();
                resultat.setPreferredSize(new Dimension(250, 30));
                resultat.setHorizontalAlignment(SwingConstants.CENTER);
                resultat.setBorder(BorderFactory.createLineBorder(Color.black, 1));
            res.add(resultat);

            // Panell inferior (botons)
            JPanel botons = new JPanel();
            // Organitzar com una graella de 1 fila x 4 columnes
            GridLayout gLayout = new GridLayout(1, 4);
            gLayout.setHgap(5); // Separació horitzontal entre botons
            botons.setLayout(gLayout);
            botons.setBorder(new EmptyBorder(6, 4, 6, 4));
            botons.setPreferredSize(new Dimension(250, 40));
                // Crear listener pels botons
                BotoListener bl = new BotoListener();
                // Crear botons +, -, *, / i assignar listener
                JButton sumar = new JButton("+");
                sumar.addActionListener(bl);
                JButton restar = new JButton("-");
                restar.addActionListener(bl);
                JButton multiplicar = new JButton("*");
                multiplicar.addActionListener(bl);
                JButton dividir = new JButton("/");
                dividir.addActionListener(bl);
            // Afegir botons al panell
            botons.add(sumar);
            botons.add(restar);
            botons.add(multiplicar);
            botons.add(dividir);

        panell.add(nums, BorderLayout.PAGE_START);
        panell.add(res, BorderLayout.CENTER);
        panell.add(botons, BorderLayout.PAGE_END);

        pack();                 // Reduir al màxim la finetra
        setResizable(false);    // Impedir que es pugui redimensionar
        setVisible(true);       // Mostra la finestra

        // Tanca el programa al tancar la finestra
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    class BotoListener implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            Float v1;
            Float v2;

            try {
                // Agafar el text dels camps num1 i num2, i convertir a float
                v1 = Float.parseFloat(num1.getText());
                v2 = Float.parseFloat(num2.getText());
            } catch (NumberFormatException nfe) {
                operacio.setText("");
                resultat.setText("ERROR en els valors introduïts");
                return;
            }

            // Obtenir el text del botó que s'ha clicat
            String op = e.getActionCommand();

            // Escriure la operació entre els dos números
            operacio.setText(op);

            // Realitzar la operació i mostrar en la finestra resultat
            switch (op) {
                case "+":
                    resultat.setText("" + (v1 + v2));
                    break;
                case "-":
                    resultat.setText("" + (v1 - v2));
                    break;
                case "*":
                    resultat.setText("" + (v1 * v2));
                    break;
                case "/":
                    resultat.setText("" + (v1 / v2));
                    break;
            }
        }
    }

    public static void main(String[] args) {
        new Calculadora();
    }
}
