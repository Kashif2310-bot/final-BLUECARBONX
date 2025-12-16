public class MultipleCatchDemo 
{ 
   public static void main(String[] args) 
   { 
       try 
       { 
         System.out.println("try Block:: Begin"); 
         String[] arr = {"Rohit","Shikar","Virat","Dhoni"}; 
         for(int i=0;i<=arr.length;i++)  
         { 
          System.out.println(arr[i]); 
         } 
       } 
       catch(ArithmeticException e) 
       { 
          System.out.println("Arithmetic Exception :: Divide by zero!!"); 
       } 
       catch(ArrayIndexOutOfBoundsException e) 
 
       { 
          System.out.println("ArrayIndexOutOfBounds :: Accessed index out of bounds"); 
       } 
       catch(Exception e) 
       { 
          System.out.println("Exception :: " + e.getMessage ()); 
       } 
       System.out.println("rest of the code"); 
   } 
} 